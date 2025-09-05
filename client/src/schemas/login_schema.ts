import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().max(100),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(64),
});
export type LoginSchema = z.infer<typeof loginSchema>;
