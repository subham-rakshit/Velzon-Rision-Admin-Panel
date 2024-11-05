import { z } from "zod";

//NOTE: only accept for user12, user12345
export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 2 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^(?=[a-z0-9]*[0-9])[a-z0-9]{3,}$/,
    "Username must have small characters and numbers"
  )
  .trim();

export const RegistrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  username: usernameValidation,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must be at most 10 characters long" })
    .trim(),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must be at most 10 characters long" })
    .trim(),
});
