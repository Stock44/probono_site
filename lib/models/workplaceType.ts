import { z } from "zod";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const workplaceType = new Schema("WorkplaceType", {
  name: z.string(),
});

export type WorkplaceType = ExtractModel<typeof workplaceType>;
