import z from 'zod';

export const addressSchema = z.object({
	streetName: z.string(),
	postalCode: z.string(),
	extNumber: z.coerce.number().int(),
	location: z.string().transform(string => JSON.parse(string) as [number, number]).or(z.tuple([z.number(), z.number()])),
	municipalityId: z.coerce.number().int(),
});

export type Address = z.infer<typeof addressSchema>;
