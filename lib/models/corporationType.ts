import { z } from "zod";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const corporationType = new Schema("CorporationType", {
  name: z.string(),
  shortName: z.string(),
});

export type CorporationType = ExtractModel<typeof corporationType>;
