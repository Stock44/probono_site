import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "WorkplaceType";

export const workplaceTypeSchema = entitySchema(tableName).extend({
  name: z.string(),
});

export type WorkplaceTypeSchema = typeof workplaceTypeSchema;

export type WorkplaceType = z.infer<WorkplaceTypeSchema>;
