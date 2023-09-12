import { z } from "zod";
import { entitySchema } from "@/lib/model/index";
import { unincorporatedOrgCategorySchema } from "@/lib/model/unincorporatedOrgCategory";

const tableName = "UnincorporatedOrgData";

export const unincorporatedOrgDataSchema = entitySchema(tableName).extend({
  name: z.string(),
  wantsToIncorporate: z.boolean(),
  category: unincorporatedOrgCategorySchema,
});

export type UnincorporatedOrgDataSchema = typeof unincorporatedOrgDataSchema;

export type UnincorporatedOrgData = z.infer<UnincorporatedOrgDataSchema>;
