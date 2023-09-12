import { z } from "zod";
import { entitySchema, references } from "@/lib/model/index";
import { phoneSchema } from "@/lib/model/schemas";
import { organizationSchema } from "@/lib/model/organization";

export const tableName = "person";

export const personSchema = entitySchema(tableName).extend({
  authId: z.string(),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  phone: phoneSchema,
  email: z.string().email(),
  orgPosition: z.string().nullable(),
  organization: references(organizationSchema),
});

export type PersonSchema = typeof personSchema;

export type Person = z.infer<PersonSchema>;

export function validatePerson(data: Record<string, any>, omitMetadata = true) {
  return omitMetadata
    ? personSchema
        .omit({
          id: true,
          _tableName: true,
        })
        .parse(data)
    : personSchema.parse(data);
}
