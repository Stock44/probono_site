import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "EmployeeCountCategory";

export const employeeCountCategorySchema = entitySchema(tableName).extend({
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type EmployeeCountCategorySchema = typeof employeeCountCategorySchema;

export type EmployeeCountCategory = z.infer<EmployeeCountCategorySchema>;
