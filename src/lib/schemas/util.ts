import z from 'zod';

export function emptyStringToNull(arg: unknown) {
	if (typeof arg !== 'string') {
		return arg;
	}

	if (arg.trim() === '') {
		return null;
	}

	return arg;
}

export const phoneSchema = z
	.string()
	.regex(/\+?[()+\d ]+(x\d+)?/g, 'Numero inválido')
	.transform(value => value.replaceAll(/[^+\dx]/g, ''));

export const emptyStringToNullSchema = z.string().transform(emptyStringToNull);

export function urlHostnameRefinement(hostname: string) {
	const hostnames = new Set([`${hostname}.com`, `www.${hostname}.com`]);
	return (url: string, ctx: z.RefinementCtx) => {
		try {
			const urlObject = url.startsWith('https://') ? new URL(url) : new URL(`https://${url}`);

			if (!hostnames.has(urlObject.hostname)) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_string,
					validation: 'url',
					message: 'Dirección inválida',
				});
				return z.NEVER;
			}

			let {pathname: socialId} = urlObject;

			if (socialId.startsWith('/')) {
				socialId = socialId.slice(1);
			}

			if (socialId.endsWith('/')) {
				socialId = socialId.slice(0, -1);
			}

			return socialId;
		} catch {
			ctx.addIssue({
				code: z.ZodIssueCode.invalid_string,
				validation: 'url',
				message: 'Dirección inválida',
			});
		}
	};
}

export function formInputSchema<Schema extends z.ZodTypeAny>(schema: Schema) {
	return z.preprocess(emptyStringToNull, schema);
}

export const boolean = z.literal('')
	.transform(value => false).or(z.coerce.boolean());

/**
 * Parse a JSON string into an object of a given schema.
 * If the schema is matched, return the parsed object. Otherwise, return the original schema.
 *
 * @template Schema - The Zod schema type
 *
 * @param {Schema} schema - The Zod schema to validate the parsed object against
 *
 * @returns {Schema} - The parsed object if it matches the schema, otherwise the original schema
 */
export function json<Schema extends z.ZodTypeAny>(schema: Schema) {
	return z.string().transform((value, ctx) => {
		try {
			return JSON.parse(value) as unknown;
		} catch {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
			});
			return z.NEVER;
		}
	}).pipe(schema).or(schema);
}
