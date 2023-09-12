import { z } from "zod";
import { entitySchema } from "@/lib/model/index";

const tableName = "State";

export const stateSchema = entitySchema(tableName).extend({
  name: z.string(),
});

export type StateSchema = typeof stateSchema;

export type State = z.infer<StateSchema>;
