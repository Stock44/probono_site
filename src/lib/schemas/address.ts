import z from 'zod';

export const organizationAddressSchema = z.object({
	streetName: z.string(),
	postalCode: z.string(),
	extNumber: z.coerce.number().int(),
	location: z.string().transform(string => JSON.parse(string) as [number, number]).or(z.tuple([z.number(), z.number()])),
	municipalityId: z.coerce.number().int(),

	organizationId: z.coerce.number().int(),
});

export type OrganizationAddress = z.infer<typeof organizationAddressSchema>;
