import { z } from "zod";
import { entitySchema, references } from "@/lib/model/index";
import { stateSchema } from "@/lib/model/state";

const tableName = "Municipality";

export const municipalitySchema = entitySchema(tableName).extend({
  name: z.string(),
  state: references(stateSchema),
});

export type MunicipalitySchema = typeof municipalitySchema;

export type Municipality = z.infer<MunicipalitySchema>;
