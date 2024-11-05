import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must be at most 10 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must be at most 10 characters long" }),
});
