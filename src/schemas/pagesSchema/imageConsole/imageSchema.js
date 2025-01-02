import { z } from "zod";

const MAX_FILE_SIZE = 3000000; // 3MB
const MAX_FILE_NAME_LENGTH = 255; // Max length for image file name
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AllImageSchema = z.object({
  imageType: z
    .string()
    .nonempty("Image type is required")
    .refine(
      (value) =>
        [
          "profile-pictures",
          "thumbnails",
          "blog-article",
          "web-banner",
          "ecommerce-product-image",
          "general-web-use",
        ].includes(value),
      { message: "Invalid image type" }
    ),
  minWidth: z
    .number()
    .optional()
    .refine((value) => value > 0, {
      message: "Required.",
    })
    .nullable(),
  minHeight: z
    .number()
    .optional()
    .refine((value) => value > 0, {
      message: "Required.",
    })
    .nullable(),
  imageFile: z
    .custom((file) => file instanceof File, {
      message: "File is required and must be a valid file.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be 3MB or less.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpeg, .jpg, .png, or .webp files are accepted.",
    })
    .refine((file) => file.name.length <= MAX_FILE_NAME_LENGTH, {
      message: `Invalid file name. Please modify it.`,
    })
    .refine((file) => /^[a-zA-Z0-9-_\.]+$/.test(file.name), {
      message:
        "File name contains invalid characters. Only letters, numbers, hyphens, underscores, and dots are allowed.",
    })
    .optional(),
});
