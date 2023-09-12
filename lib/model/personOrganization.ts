import { entitySchema, references } from "";
import { z } from "zod";
import { organizationSchema } from "@/lib/model/organization";
import { personSchema } from "@/lib/model/person";

export const tableName = "PersonOrganization";

export const personOrganizationSchema = entitySchema(tableName).extend({
  person: references(personSchema),
  organization: references(organizationSchema),
  position: z.string().min(1),
});

export type PersonSchema = typeof personOrganizationSchema;

export type PersonOrganization = z.infer<PersonSchema>;
