import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginPayload = z.infer<typeof loginValidation>;
