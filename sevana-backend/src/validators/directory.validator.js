const { z } = require("zod");

const idParamSchema = z.object({ id: z.string().uuid() });

const nearbyQuerySchema = z
  .object({
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    radius: z.coerce.number().positive().max(100).default(5),
  })
  .refine((data) => (data.lat === undefined) === (data.lng === undefined), {
    message: "lat and lng must be provided together.",
  });

module.exports = { idParamSchema, nearbyQuerySchema };
