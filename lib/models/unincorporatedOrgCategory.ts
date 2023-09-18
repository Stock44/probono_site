import { z } from "zod";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const unincorporatedOrgCategory = new Schema(
  "UnincorporatedOrgCategory",
  {
    name: z.string(),
  },
);

export type UnincorporatedOrgCategory = ExtractModel<
  typeof unincorporatedOrgCategory
>;
