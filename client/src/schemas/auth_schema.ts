import { z } from "zod";

export const authSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type AuthSchema = z.infer<typeof authSchema>;
