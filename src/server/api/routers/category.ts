import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  createCategoryRequest,
  updateCategoryRequest,
} from "@/server/validations/category.validation";

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
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch categories",
        cause: error,
      });
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const category = await ctx.db.category.findUnique({
          where: { id: input.id },
        });
        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Category with ID : ${input.id} not found`,
          });
        }
        return category;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch category by id",
          cause: error,
        });
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
        });
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create category",
          cause: error,
        });
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
        });
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update category",
          cause: error,
        });
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const currentCategory = await ctx.db.category.count({
          where: { id: input.id },
        });
        if (currentCategory === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Category with ID : ${input.id} not found`,
          });
        }
        await ctx.db.category.delete({ where: { id: input.id } });
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete category",
          cause: error,
        });
      }
    }),
});
