import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or phone is required."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(2, "Full name must contain at least 2 characters.")
      .max(100, "Full name is too long."),

    phone: z
      .string()
      .trim()
      .min(10, "Phone number is invalid.")
      .max(15, "Phone number is invalid."),

    email: z
      .string()
      .trim()
      .email("Invalid email address.")
      .or(z.literal("")),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(100),

    confirmPassword: z
      .string()
      .min(6, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });