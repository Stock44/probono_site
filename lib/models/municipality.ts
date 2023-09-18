import { z } from "zod";
import { Schema, references, type ExtractModel } from "@/lib/models/index";
import { state } from "@/lib/models/state";

export const municipality = new Schema("Municipality", {
  name: z.string(),
  state: references(state),
});

export type Municipality = ExtractModel<typeof municipality>;
