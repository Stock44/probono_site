import { z } from "zod";
import { Schema, references, type InferEntity } from "@/lib/models/index";
import { state } from "@/lib/models/state";

export const municipality = new Schema("Municipality", {
  name: z.string(),
  state: references(state, false),
});

export type Municipality = InferEntity<typeof municipality>;
