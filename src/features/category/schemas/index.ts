import { z } from "zod";

export const createCategoryFormSchema = z.object({
  name: z.string().min(1).max(100).toLowerCase(),
});

export const updateCategoryFormSchema = createCategoryFormSchema;
