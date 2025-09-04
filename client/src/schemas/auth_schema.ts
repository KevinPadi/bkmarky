import { z } from "zod";

export const authSchema = z.object({
  name: z
    .string("Name is required")
    .max(100, "Name cannot be longer than 50 characters"),
  email: z
    .email("Email is required")
    .max(100, "Email cannot exceed 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AuthSchema = z.infer<typeof authSchema>;
