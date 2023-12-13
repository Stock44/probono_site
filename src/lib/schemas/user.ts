import z from 'zod';
import {phoneSchema} from '@/lib/schemas/util.ts';

export const userInitSchema = z.object({
	givenName: z.string(),
	familyName: z.string(),

	contactEmail: z.string().email().nullish(),
	contactPhone: phoneSchema.nullish(),
});

export const userUpdateSchema = userInitSchema.extend({
	email: z.string().email(),
}).partial();

export type UserInit = z.infer<typeof userInitSchema>;

export type UserUpdate = z.infer<typeof userUpdateSchema>;
