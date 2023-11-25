import z from 'zod';
import {DonationAuthStatus, CluniStatus, Gender} from '@prisma/client';
import {
	json,
	phoneSchema,
	urlHostnameRefinement,
} from '@/lib/schemas/util.ts';

const kb = 1000;

export const organizationSchema = z.object({
	logo: z.instanceof(File).superRefine((file, ctx) => {
		console.log(file.size);
		if (file.size > 50 * kb) {
			ctx.addIssue({
				code: 'custom',
				path: ['logo'],
				message: 'El archivo no puede pesar mas de 50 KB',
			});
		}
	}).nullish(),
	// eslint-disable-next-line @typescript-eslint/naming-convention
	name: z.string({invalid_type_error: 'Campo requerido'}),
	foundingYear: z.coerce.number().int(),
	email: z.string().email('Correo inválido').nullish(),
	webpage: z.string().url('Dirección inválida').nullish(),
	phone: phoneSchema.nullish(),
	hasInvestmentAgreement: z.coerce.boolean().nullish(),
	logoUrl: z.string().nullish(),
	ods: z.coerce.number().int().nullish(),
	facebook: z.string().transform(urlHostnameRefinement('facebook')).nullish(),
	instagram: z.string().transform(urlHostnameRefinement('instagram')).nullish(),
	twitter: z.string().transform(urlHostnameRefinement('twitter')).nullish(),
	tiktok: z.string().transform(urlHostnameRefinement('tiktok')).nullish(),
	youtube: z.string().transform(urlHostnameRefinement('youtube')).nullish(),
	linkedIn: z.string().transform(urlHostnameRefinement('linkedin')).nullish(),
	wantsToIncorporate: z.coerce.boolean().nullish(),
	isIncorporated: z.coerce.boolean(),
	rfc: z.string().nullish(),
	donationAuthStatus: z.nativeEnum(DonationAuthStatus).nullish(),
	cluniStatus: z.nativeEnum(CluniStatus).nullish(),
	employeeCountCategoryId: z.coerce.number().int().nullish(),
	volunteerCountCategoryId: z.coerce.number().int().nullish(),
	legalConcept: z.string().nullish(),
	corporationTypeId: z.coerce.number().int().nullish(),
	incorporationYear: z.coerce.number().int().nullish(),
	organizationCategoryId: z.coerce.number().int().nullish(),
	ageGroups: json(z.array(z.object({
		ageGroupId: z.coerce.number().int(),
		gender: z.nativeEnum(Gender),
	}))).nullish(),
	organizationBeneficiaries: json(z.array(z.number().int())).nullish(),
	activities: json(z.array(z.object({
		activityId: z.number().int(),
		priority: z.number().int(),
	}))).nullish(),
});

export type OrganizationInit = z.infer<typeof organizationSchema>;
