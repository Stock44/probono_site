import { z } from "zod";
import { type InferEntity, Schema } from "@/lib/models/index";

export const workplaceType = new Schema("WorkplaceType", {
  name: z.string(),
});

export type WorkplaceType = InferEntity<typeof workplaceType>;
