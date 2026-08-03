import { z } from "zod";

export const reportSchema = z.object({
  animal_type: z
    .string()
    .min(2, "Animal type is required."),

  species: z.string().optional(),

  breed: z.string().optional(),

  gender: z.enum([
    "male",
    "female",
    "unknown",
  ]),

  estimated_age: z.string().optional(),

  color: z.string().optional(),

  severity: z.enum([
    "low",
    "medium",
    "high",
    "critical",
  ]),

  condition: z
    .string()
    .min(5, "Condition should be at least 5 characters."),

  latitude: z.number(),

  longitude: z.number(),

  address: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  postcode: z.string().optional(),

  landmark: z.string().optional(),
});

export default reportSchema;
