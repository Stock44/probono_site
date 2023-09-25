import { z } from "zod";
import { organization } from "@/lib/models/organization";
import { person } from "@/lib/models/person";
import { Schema, references, type InferEntity } from "@/lib/models/index";

export const personOrganization = new Schema("PersonOrganization", {
  person: references(person, false),
  organization: references(organization, false),
  position: z.string().min(1),
});

export type PersonOrganization = InferEntity<typeof personOrganization>;
