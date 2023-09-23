import { z } from "zod";
import { type InferEntity, Schema } from "@/lib/models/index";

export const corporationType = new Schema("CorporationType", {
  name: z.string(),
  shortName: z.string().nullable(),
});

export type CorporationType = InferEntity<typeof corporationType>;
