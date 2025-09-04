import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().max(100, "Name cannot be longer than 50 characters"),
  email: z
    .email("Email is required")
    .max(100, "Email cannot be longer than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password cannot be longer than 64 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .max(100, "Email cannot be longer than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password cannot be longer than 64 characters"),
});
