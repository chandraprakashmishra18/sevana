const { z } = require("zod");

const createPostSchema = z
  .object({
    post_type: z.enum(["lost", "found"]),
    animal_desc: z.string().trim().max(500).optional(),
    photo_url: z.string().trim().url().max(2048).optional(),
    contact_info: z.string().trim().max(160).optional(),
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional(),
  })
  .strict()
  .refine((data) => (data.lat === undefined) === (data.lng === undefined), {
    message: "lat and lng must be provided together.",
  });

const listPostsQuerySchema = z.object({
  post_type: z.enum(["lost", "found"]).optional(),
  status: z.enum(["open", "resolved"]).default("open"),
});

const idParamSchema = z.object({ id: z.string().uuid() });

module.exports = { createPostSchema, listPostsQuerySchema, idParamSchema };
