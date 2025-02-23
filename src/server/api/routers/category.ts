import { handleError } from "@/server/filters";
import {
  createCategoryRequest,
  updateCategoryRequest,
} from "@/server/validations";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const categories = await ctx.db.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return categories;
    } catch (error) {
      handleError(error);
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const category = await ctx.db.category.findUnique({
          where: { id: input.id },
          select: {
            name: true,
          },
        });
        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Category with ID : ${input.id} not found`,
          });
        }
        return category;
      } catch (error) {
        handleError(error);
      }
    }),

  create: publicProcedure
    .input(createCategoryRequest)
    .mutation(async ({ ctx, input }) => {
      try {
        const currentCategory = await ctx.db.category.count({
          where: { name: input.name },
        });

        if (currentCategory !== 0) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Name : ${input.name} already used`,
          });
        }

        await ctx.db.category.create({
          data: input,
          select: {
            name: true,
            created_at: true,
          },
        });
      } catch (error) {
        handleError(error);
      }
    }),

  update: publicProcedure
    .input(updateCategoryRequest)
    .mutation(async ({ ctx, input }) => {
      try {
        const currentCategory = await ctx.db.category.findUnique({
          where: { id: input.id },
        });

        if (!currentCategory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Category with ID : ${input.id} not found`,
          });
        }

        if (currentCategory && currentCategory.name === input.name) {
          const nameExists = await ctx.db.category.count({
            where: { name: input.name },
          });
          if (nameExists !== 0) {
            throw new TRPCError({
              code: "CONFLICT",
              message: `Name : ${input.name} already used`,
            });
          }
        }

        await ctx.db.category.update({
          where: { id: input.id },
          data: { name: input.name },
          select: {
            name: true,
            updated_at: true,
          },
        });
      } catch (error) {
        handleError(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const categoryExists = await ctx.db.category.count({
          where: { id: input.id },
        });
        if (categoryExists === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Category with ID : ${input.id} not found`,
          });
        }
        await ctx.db.category.delete({
          where: { id: input.id },
          select: { id: true },
        });
      } catch (error) {
        handleError(error);
      }
    }),
});
