const { z } = require("zod");

const optionalText = (max) => z.string().trim().max(max).optional();

const updateProfileSchema = z
  .object({
    full_name: z.string().trim().min(2).max(120).optional(),
    phone: z.string().trim().min(10).max(20).optional(),
    avatar_url: z.string().trim().url().max(2048).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    area: optionalText(100),
    city: optionalText(100),
    state: optionalText(100),
    pincode: z.string().trim().max(10).optional(),
    bio: optionalText(1000),
    blood_group: optionalText(10),
    emergency_contact_name: optionalText(120),
    emergency_contact_phone: z.string().trim().min(10).max(20).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update.",
  });

const statsQuerySchema = z
  .object({
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
  })
  .refine((data) => (data.lat === undefined) === (data.lng === undefined), {
    message: "lat and lng must be provided together.",
  });

module.exports = { updateProfileSchema, statsQuerySchema };
