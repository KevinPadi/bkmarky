import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email").max(100),
  password: z.string().min(6).max(64),
});
export type LoginSchema = z.infer<typeof loginSchema>;
