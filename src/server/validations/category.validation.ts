import { z } from "zod";

export const createCategoryRequest = z.object({
  name: z.string().min(1).max(100).toLowerCase(),
});

export const updateCategoryRequest = createCategoryRequest.partial().extend({
  id: z.string().min(1),
});
