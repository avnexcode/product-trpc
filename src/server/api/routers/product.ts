import { handleError } from "@/server/filters";
import {
  createProductRequest,
  updateProductRequest,
} from "@/server/validations";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.db.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          description: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return products;
    } catch (error) {
      handleError(error);
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const product = await ctx.db.product.findUnique({
          where: { id: input.id },
          select: {
            name: true,
            price: true,
            image: true,
            description: true,
            category_id: true,
          },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Product with ID : ${input.id} not found`,
          });
        }

        return product;
      } catch (error) {
        handleError(error);
      }
    }),

  create: publicProcedure
    .input(createProductRequest)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.product.create({
          data: input,
          select: {
            name: true,
            price: true,
            image: true,
            description: true,
            category_id: true,
            created_at: true,
          },
        });
      } catch (error) {
        handleError(error);
      }
    }),

  update: publicProcedure
    .input(updateProductRequest)
    .mutation(async ({ ctx, input }) => {
      try {
        const productExists = await ctx.db.product.count({
          where: { id: input.id },
        });

        if (productExists === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Product with ID : ${input.id} not found`,
          });
        }

        await ctx.db.product.update({
          where: { id: input.id },
          data: input,
          select: {
            name: true,
            price: true,
            image: true,
            description: true,
            category_id: true,
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
        const productExists = await ctx.db.product.count({
          where: { id: input.id },
        });

        if (productExists === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Product with ID : ${input.id} not found`,
          });
        }

        await ctx.db.product.delete({
          where: { id: input.id },
          select: {
            id: true,
          },
        });
      } catch (error) {
        handleError(error);
      }
    }),
});
