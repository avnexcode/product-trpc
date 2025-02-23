import { z } from "zod";

export const createProductRequest = z.object({
  name: z.string().min(1).max(150),
  price: z.string().min(1).max(50),
  image: z.string().optional(),
  description: z.string().optional(),
  category_id: z.string().min(1),
});

export const updateProductRequest = createProductRequest.partial().extend({
  id: z.string().min(1),
});
