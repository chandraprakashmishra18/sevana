const { z } = require("zod");

const optionalUuid = z.string().uuid().nullable().optional();

const createDonationSchema = z
  .object({
    donor_id: optionalUuid,
    report_id: optionalUuid,
    ngo_id: optionalUuid,
    amount: z.coerce.number().positive().max(9999999999.99),
    currency: z.string().trim().toUpperCase().min(3).max(10).default("INR"),
    payment_method: z.string().trim().max(30).nullable().optional(),
    payment_status: z
      .enum(["pending", "successful", "failed", "refunded"])
      .default("pending"),
    transaction_reference: z.string().trim().max(255).nullable().optional(),
    purpose: z.string().trim().max(150).nullable().optional(),
    notes: z.string().trim().max(5000).nullable().optional(),
  })
  .strict();

const idParamSchema = z.object({ id: z.string().uuid() });

module.exports = { createDonationSchema, idParamSchema };
