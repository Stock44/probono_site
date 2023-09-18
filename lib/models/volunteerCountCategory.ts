import { z } from "zod";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const volunteerCountCategory = new Schema("VolunteerCountCategory", {
  range: z.tuple([z.number().int(), z.number().int()]),
});

export type VolunteerCountCategory = ExtractModel<
  typeof volunteerCountCategory
>;
