import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must be at most 10 characters long" })
    .trim(),
});
