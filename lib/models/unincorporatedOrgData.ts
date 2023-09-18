import { z } from "zod";
import { unincorporatedOrgCategory } from "@/lib/models/unincorporatedOrgCategory";
import { type ExtractModel, Schema, references } from "@/lib/models/index";

export const unincorporatedOrgData = new Schema("UnincorporatedOrgData", {
  name: z.string(),
  wantsToIncorporate: z.boolean(),
  category: references(unincorporatedOrgCategory),
});

export type UnincorporatedOrgData = ExtractModel<typeof unincorporatedOrgData>;
