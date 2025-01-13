import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const AllBlogsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(150, { message: "Title must be at most 150 characters long" })
    .transform((title) => title.trim()),
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
  category: z.string().refine((value) => isValidId(value), {
    message: "Category must be a valid ObjectId.",
  }),
  bannerImage: z
    .string()
    .url({ message: "Banner image must be a valid URL" })
    .optional(),
  shortDescription: z
    .string()
    .min(5, { message: "Short Description must be at least 5 characters long" })
    .max(200, {
      message: "Short Description must be at most 200 characters long",
    }),
  description: z.string().optional(),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag must not be empty." })
        .max(20, { message: "Each tag must not exceed 20 characters." })
    )
    .max(20, { message: "A maximum of 20 tags are allowed." })
    .optional(),
  source: z.string().optional().default(""),
  metaTitle: z
    .string()
    .max(150, "Meta title must not exceed 150 characters")
    .default("")
    .transform((title) => title.trim()),
  metaImage: z.string().optional().default(""),
  metaDescription: z
    .string()
    .max(200, "Meta description must be not exceed 200 characters")
    .default("")
    .transform((desc) => desc.trim()),
});
