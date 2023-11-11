import z from 'zod';
import {emptyStringToNull, phoneSchema} from '@/lib/schemas/util.ts';

export const personSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	givenName: z.string(),
	familyName: z.string(),
	contactEmail: z.string().email().nullish(),
	phone: phoneSchema.nullish(),
});
