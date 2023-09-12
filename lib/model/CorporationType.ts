import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "CorporationType";

export const corporationTypeSchema = entitySchema(tableName).extend({
  name: z.string(),
  shortName: z.string(),
});

export type CorporationTypeSchema = typeof corporationTypeSchema;

export type CorporationType = z.infer<CorporationTypeSchema>;
