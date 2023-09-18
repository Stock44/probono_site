import { z } from "zod";

export const idSchema = z.bigint().or(z.number()).or(z.string());

export type Id = z.infer<typeof idSchema>;

export const phoneSchema = z
  .string()
  .trim()
  .regex(/\+?\d+/)
  .max(16)
  .refine((value: string) => /[^+\d ]/.exec(value) == null, {
    message:
      "phone number must only contain numbers, optionally prepended with a plus sign",
  })
  .transform((value) => value.replace(/[^+\d]/, ""));

export const pointSchema = z
  .tuple([z.number(), z.number()])
  .transform(([x, y]) => `(${x}, ${y})`);
