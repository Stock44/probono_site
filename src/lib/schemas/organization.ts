import z from 'zod';
import {DonationAuthStatus, CluniStatus} from '@prisma/client';
import {emptyStringToNull, phoneSchema} from '@/lib/schemas/index.ts';

export const organizationSchema = z.object({
	id: z.number().int(),
	name: z.string().min(1),
	foundingYear: z.coerce.number().int(),
	phone: z.preprocess(emptyStringToNull, phoneSchema.nullish()),
	email: z.preprocess(emptyStringToNull, z.string().email().nullish()),
	hasInvestmentAgreement: z.boolean().nullish(),
	logoUrl: z.preprocess(emptyStringToNull, z.string().nullish()),
	ods: z.number().int().nullish(),
	webpage: z.preprocess(emptyStringToNull, z.string().nullish()),
	facebook: z.preprocess(emptyStringToNull, z.string().nullish()),
	instagram: z.preprocess(emptyStringToNull, z.string().nullish()),
	twitter: z.preprocess(emptyStringToNull, z.string().nullish()),
	tiktok: z.preprocess(emptyStringToNull, z.string().nullish()),
	youtube: z.preprocess(emptyStringToNull, z.string().nullish()),
	linkedin: z.preprocess(emptyStringToNull, z.string().nullish()),
	wantsToIncorporate: z.boolean().nullish(),
	rfc: z.preprocess(emptyStringToNull, z.string().nullish()),
	donationAuthStatus: z.nativeEnum(DonationAuthStatus).nullish(),
	cluniStatus: z.nativeEnum(CluniStatus).nullish(),
});
