import { z } from "zod";

export const signInSchema = z.object({
  indentifier: z.string(), //INFO: identifier = email
  password: z.string(),
});
