import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const CategorySchema = z.object({
  name: z
    .string()
    .min(5, { message: "Category name must atleast 5 characters long." })
    .max(100, { message: "Category name must not exceed 100 characters." })
    .transform((name) => name.trim()), // Trim leading and trailing whitespace

  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .trim()
    .transform(
      (slug) =>
        slug
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
    )
    .refine((slug) => /^[a-z0-9-]+$/.test(slug), {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),

  description: z
    .string()
    .max(200, { message: "Description must not exceed 200 characters." })
    .optional(),

  parentCategoryId: z
    .string()
    .optional()
    .refine((value) => !value || value === "none" || isValidId(value), {
      message: "Parent category must be either 'none' or a valid ObjectId.",
    }),

  metaTitle: z
    .string()
    .max(150, { message: "Meta title must not exceed 150 characters." })
    .optional()
    .transform((title) => title?.trim() || ""),

  // TODO Need to validate metaImage with valid URL
  metaImage: z.string().optional(),

  metaDescription: z
    .string()
    .max(200, { message: "Meta description must not exceed 200 characters." })
    .optional()
    .transform((desc) => desc?.trim() || ""),
});
