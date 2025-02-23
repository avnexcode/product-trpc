import {
  createProductRequest,
  updateProductRequest,
} from "@/server/validations/product.validation";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.db.product.findMany({
        include: {
          category: true,
        },
      });
      return products;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error,
        });
      }
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const product = await ctx.db.product.findUnique({
          where: { id: input.id },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Product with ID : ${input.id} not found`,
          });
        }

        return product;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            cause: error,
          });
        }
      }
    }),

  create: publicProcedure
    .input(createProductRequest)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.product.create({
          data: input,
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            cause: error,
          });
        }
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
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            cause: error,
          });
        }
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
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            cause: error,
          });
        }
      }
    }),
});
