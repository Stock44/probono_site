import { z } from "zod";
import { type InferEntity, Schema } from "@/lib/models/index";

export const incomeCategory = new Schema("IncomeCategory", {
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type IncomeCategory = InferEntity<typeof incomeCategory>;
