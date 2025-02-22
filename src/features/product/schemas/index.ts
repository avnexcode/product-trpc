import { z } from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(1).max(150),
  price: z.string().min(1).max(50),
  image: z.string().max(150).optional(),
  description: z.string().max(150).optional(),
  category_id: z.string().min(1),
});

export const updateProductFormSchema = createProductFormSchema;
