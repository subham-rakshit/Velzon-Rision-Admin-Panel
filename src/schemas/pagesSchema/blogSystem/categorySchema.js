import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required." })
    .max(150, { message: "Category name must not exceed 150 characters." })
    .regex(/^(?!.* {2,})[a-zA-Z0-9\s]+$/, {
      message:
        "Category name can only include letters, numbers, and spaces, with no extra spaces between words.",
    })
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
    .min(50, { message: "Description must be at least 50 characters long." })
    .max(1000, { message: "Description must not exceed 1000 characters." })
    .default(""),

  parentCategoryId: z
    .string()
    .min(1, "Parent category is required.")
    .refine((value) => value === "none" || isValidId(value), {
      message: "Parent category must be either 'none' or a valid ObjectId.",
    }),

  colorTheme: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
      message: "Color theme must be a valid hex color code.",
    })
    .default("#495057"),

  isFeatured: z.boolean().default(true),

  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag must not be empty." })
        .max(20, { message: "Each tag must not exceed 20 characters." })
    )
    .min(1, { message: "Tags are required." })
    .max(20, { message: "A maximum of 20 tags are allowed." }),

  metaTitle: z
    .string()
    .max(150, "Meta title must not exceed 150 characters")
    .default("")
    .transform((title) => title.trim()),

  // TODO Need to validate metaImage with valid URL
  metaImage: z.string().optional().default(""),

  metaDescription: z
    .string()
    .max(160, "Meta description must not exceed 160 characters")
    .default("")
    .transform((desc) => desc.trim()),
});
