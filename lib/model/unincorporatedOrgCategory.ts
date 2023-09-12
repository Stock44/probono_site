import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "UnincorporatedOrgCategory";

export const unincorporatedOrgCategorySchema = entitySchema(tableName).extend({
  name: z.string(),
});

export type UnincorporatedOrgCategorySchema =
  typeof unincorporatedOrgCategorySchema;

export type UnincorporatedOrgCategory =
  z.infer<UnincorporatedOrgCategorySchema>;
