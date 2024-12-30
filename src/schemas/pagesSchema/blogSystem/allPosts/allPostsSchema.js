import { z } from "zod";

export const AllPostsSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" })
    .trim(),
  category: z.string().trim(),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(100, { message: "Slug must be at most 100 characters long" })
    .regex(/^[a-z]+(-[a-z]+)*$/, {
      message: "Slug must be in kebab-case (eg. abc-abc)",
    })
    .trim(),
  shortDescription: z
    .string()
    .min(3, { message: "Short Description must be at least 3 characters long" })
    .max(200, {
      message: "Short Description must be at most 200 characters long",
    })
    .trim(),
});
