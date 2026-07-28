const { z } = require("zod");

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().max(65535).default(5000),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().min(1).optional(),
});

function validateEnvironment() {
  const parsed = environmentSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment configuration.");
    process.exit(1);
  }
  return parsed.data;
}

module.exports = { validateEnvironment };
