import { z } from "zod";

const email = z.string().email().min(1).max(255);
const password = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: email,
  password: password,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1).max(255),
    phone: z.string().optional(),
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Pasword didn't match.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Pasword didn't match.",
    path: ["confirmPassword"],
  });
