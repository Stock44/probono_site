import z from 'zod';
import {emptyStringToNull, phoneSchema} from '@/lib/schemas/util.ts';

export const personSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	givenName: z.string(),
	familyName: z.string(),
	contactEmail: z.preprocess(emptyStringToNull, z.string().email().nullish()),
	phone: z.preprocess(emptyStringToNull, phoneSchema.nullish()),
});
