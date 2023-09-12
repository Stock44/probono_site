import { z } from "zod";
import { entitySchema, references } from "@/lib/model/index";
import { pointSchema } from "@/lib/model/schemas";
import { municipalitySchema } from "@/lib/model/municipality";

const tableName = "OrganizationOffice";

export const organizationOfficeSchema = entitySchema(tableName).extend({
  municipality: references(municipalitySchema),
  neighborhood: z.string(),
  postalCode: z.number().int(),
  streetName: z.string(),
  extNumber: z.number().int(),
  intNumber: z.number().int().nullable(),
  betweenStreets: z.string().nullable(),
  location: pointSchema,
});

export type OrganizationOfficeSchema = typeof organizationOfficeSchema;

export type OrganizationOffice = z.infer<OrganizationOfficeSchema>;
