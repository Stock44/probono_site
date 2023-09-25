import { z } from "zod";
import { type InferEntity, Schema } from "@/lib/models/index";

export const unincorporatedOrgCategory = new Schema(
  "UnincorporatedOrgCategory",
  {
    name: z.string(),
  },
);

export type UnincorporatedOrgCategory = InferEntity<
  typeof unincorporatedOrgCategory
>;
