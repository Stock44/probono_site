import z, {undefined} from 'zod';
import {DonationAuthStatus, CluniStatus} from '@prisma/client';
import {emptyStringToNull, emptyStringToNullSchema, phoneSchema, urlHostnameRefinement} from '@/lib/schemas/util.ts';

const kb = 1000;

export const organizationSchema = z.object({
	id: z.coerce.number(),

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
	email: z.preprocess(emptyStringToNull, z.string().email('Correo inválido').nullish()),
	webpage: z.preprocess(emptyStringToNull, z.string().url('Dirección inválida').nullish()),
	phone: z.preprocess(emptyStringToNull, phoneSchema.nullish()),
	hasInvestmentAgreement: z.coerce.boolean().nullish(),
	logoUrl: z.preprocess(emptyStringToNull, z.string().nullish()),
	ods: z.coerce.number().int().nullish(),
	facebook: z.preprocess(emptyStringToNull, z.string().transform(urlHostnameRefinement('facebook')).nullish()),
	instagram: z.preprocess(emptyStringToNull, z.string().transform(urlHostnameRefinement('instagram')).nullish()),
	twitter: z.preprocess(emptyStringToNull, z.string().transform(urlHostnameRefinement('twitter')).nullish()),
	tiktok: z.preprocess(emptyStringToNull, z.string().transform(urlHostnameRefinement('tiktok')).nullish()),
	youtube: z.preprocess(emptyStringToNull, z.string().transform(urlHostnameRefinement('youtube')).nullish()),
	linkedIn: z.preprocess(emptyStringToNull, z.string().transform(urlHostnameRefinement('linkedin')).nullish()),
	wantsToIncorporate: z.coerce.boolean().nullish(),
	rfc: z.preprocess(emptyStringToNull, z.string().nullish()),
	donationAuthStatus: z.nativeEnum(DonationAuthStatus).nullish(),
	cluniStatus: z.nativeEnum(CluniStatus).nullish(),
	employeeCountCategoryId: z.coerce.number().int().nullish(),
	volunteerCountCategoryId: z.coerce.number().int().nullish(),
});
