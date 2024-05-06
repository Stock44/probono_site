import z from 'zod';

export const addressInitSchema = z.object({
	street: z.string(),
	postalCode: z.string(),
	number: z.coerce.number().int(),
	location: z
		.string()
		.transform(string => JSON.parse(string) as [number, number])
		.or(z.tuple([z.number(), z.number()])),
	municipalityId: z.coerce.number().int(),
});

export type AddressInit = z.infer<typeof addressInitSchema>;
