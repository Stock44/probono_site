import { z } from "zod";
import { organization } from "@/lib/models/organization";
import { person } from "@/lib/models/person";
import { type ExtractModel, Schema, references } from "@/lib/models/index";

export const personOrganization = new Schema("PersonOrganization", {
  person: references(person),
  organization: references(organization),
  position: z.string().min(1),
});

export type PersonOrganization = ExtractModel<typeof personOrganization>;
