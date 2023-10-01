import z from "zod";
import { emptyStringToNull, phoneSchema } from "@/lib/schemas/index";

export const personSchema = z.object({
  id: z.number().int(),
  authId: z.string(),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  email: z.string().email(),
  phone: z.preprocess(emptyStringToNull, phoneSchema.nullish()),
});
