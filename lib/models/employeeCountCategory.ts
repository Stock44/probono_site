import { z } from "zod";
import { type InferEntity, Schema } from "@/lib/models/index";

export const employeeCountCategory = new Schema("EmployeeCountCategory", {
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type EmployeeCountCategory = InferEntity<typeof employeeCountCategory>;
