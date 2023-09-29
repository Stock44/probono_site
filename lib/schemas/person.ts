import z from "zod";

export const personSchema = z.object({
  id: z.number().int(),
  authId: z.string(),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/\+?[()+\d ]+(x[\d]+)?/g)
    .transform((value) => value.replace(/[^+\dx]/g, "")),
});
