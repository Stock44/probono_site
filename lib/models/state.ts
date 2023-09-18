import { z } from "zod";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const state = new Schema("State", {
  name: z.string(),
});

export type State = ExtractModel<typeof state>;
