import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "IncomeCategory";

export const incomeCategorySchema = entitySchema(tableName).extend({
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type IncomeCategorySchema = typeof incomeCategorySchema;

export type IncomeCategory = z.infer<IncomeCategorySchema>;
