import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "VolunteerCountCategory";

export const volunteerCountCategorySchema = entitySchema(tableName).extend({
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type VolunteerCountCategorySchema = typeof volunteerCountCategorySchema;

export type VolunteerCountCategory = z.infer<VolunteerCountCategorySchema>;
