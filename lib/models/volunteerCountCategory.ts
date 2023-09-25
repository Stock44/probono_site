import { z } from "zod";
import { type InferEntity, Schema } from "@/lib/models/index";

export const volunteerCountCategory = new Schema("VolunteerCountCategory", {
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type VolunteerCountCategory = InferEntity<typeof volunteerCountCategory>;
