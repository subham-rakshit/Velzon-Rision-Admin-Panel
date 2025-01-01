import { z } from "zod";

export const AllImageSchema = z.object({
  imageType: z.string().min(1, { message: "Image Type is required." }),
  maxWidth: z.string().min(1, { message: "Max width is required." }),
  maxHeight: z.string().min(1, { message: "Max height is required." }),
  imageFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "A valid image file is required.",
    })
    .refine((file) => file.size > 0, { message: "Image file cannot be empty." })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      { message: "Unsupported image format. Please upload JPEG, PNG, or GIF." }
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024, // Example: Max 2MB
      { message: "Image size should be 2MB or less." }
    ),
});
