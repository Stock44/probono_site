import { z } from "zod";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const employeeCountCategory = new Schema("EmployeeCountCategory", {
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type EmployeeCountCategory = ExtractModel<typeof employeeCountCategory>;
