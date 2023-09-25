import { z } from "zod";
import { Schema, references, InferEntity } from "@/lib/models/index";
import { pointSchema } from "@/lib/models/schemas";
import { municipality } from "@/lib/models/municipality";

export const address = new Schema("OrganizationOffice", {
  municipality: references(municipality),
  neighborhood: z.string(),
  postalCode: z.number().int(),
  streetName: z.string(),
  extNumber: z.number().int(),
  intNumber: z.number().int().nullable(),
  betweenStreets: z.string().nullable(),
  location: pointSchema,
});

export type Address = InferEntity<typeof address>;
