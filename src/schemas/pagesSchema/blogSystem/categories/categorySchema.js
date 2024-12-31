import { z } from "zod";

export const CategorySchema = z.object({
  newCategory: z
    .string()
    .min(3, { message: "New category must be at least 3 characters long" })
    .max(20, { message: "New category must be at most 20 characters long" })
    .trim(),
});
