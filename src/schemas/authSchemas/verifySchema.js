import { z } from "zod";

export const VerifySchema = z.object({
  otp: z.string().length(6, { message: "Verification code must be 6 digits" }),
});
