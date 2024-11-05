import { z } from "zod";

export const VerifySchema = z.object({
  token: z.string(),
});
