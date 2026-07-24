const { z } = require("zod");

const registerSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120),

  email: z
    .string()
    .trim()
    .email("Invalid email address.")
    .optional(),

  phone: z
    .string()
    .trim()
    .min(10)
    .max(20),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[0-9]/, "Password must contain a number."),
});

const loginSchema = z.object({
  identifier: z.string().trim().min(1),

  password: z.string().min(1),
});

module.exports = {
  registerSchema,
  loginSchema,
};