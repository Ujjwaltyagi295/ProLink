import { z } from "zod";
export const nameSchema=z.string().min(3).max(255)
export const emailSchema = z.string().email().min(1).max(255);
export const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const signupSchema = loginSchema
  .extend({
    name:nameSchema,
    confirmPassword: passwordSchema,
  })
 