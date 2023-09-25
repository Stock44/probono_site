import { z } from "zod";
import { InferEntity, Schema } from "@/lib/models/index";

export const state = new Schema("State", {
  name: z.string(),
});

export type State = InferEntity<typeof state>;
