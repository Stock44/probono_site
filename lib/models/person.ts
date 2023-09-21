import { z } from "zod";
import { phoneSchema } from "@/lib/models/schemas";
import { type ExtractModel, Schema } from "@/lib/models/index";

export const person = new Schema("Person", {
  authId: z.string(),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  phone: phoneSchema,
  email: z.string().email(),
});

export type Person = ExtractModel<typeof person>;
