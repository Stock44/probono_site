import z from 'zod';

/**
 * Converts an empty string to null.
 *
 * @param {unknown} arg - The input value to be converted.
 * @return {unknown} - The converted value. If the input is not a string or if it is not empty, the input value is returned as is. If the input is an empty string, null is returned.
 */
export function emptyStringToNull(argument: unknown) {
	if (typeof argument !== 'string') {
		return argument;
	}

	if (argument.trim() === '') {
		return null;
	}

	return argument;
}

export const phoneSchema = z
	.string()
	.regex(/\+?[\d ()+]+(x\d+)?/g, 'Numero inválido')
	.transform(value => value.replaceAll(/[^\d+x]/g, ''));

export const emptyStringToNullSchema = z.string().transform(emptyStringToNull);

/**
 * Refines the URL hostname based on a provided hostname.
 *
 * @param {string} hostname - The base hostname to compare against.
 *
 * @return {function} - A Zod refinement function that takes a URL and a Zod RefinementCtx and refines the URL hostname.
 */
export function urlHostnameRefinement(hostname: string) {
	const hostnames = new Set([`${hostname}.com`, `www.${hostname}.com`]);
	return (url: string, context: z.RefinementCtx) => {
		try {
			const urlObject = url.startsWith('https://')
				? new URL(url)
				: new URL(`https://${url}`);

			if (!hostnames.has(urlObject.hostname)) {
				context.addIssue({
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
			context.addIssue({
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

export const boolean = z
	.literal('')
	.transform(() => false)
	.or(z.coerce.boolean());

/**
 * Parse a JSON string into an object of a given schema.
 * If the schema is matched, return the parsed object. Otherwise, return the original schema.
 *
 * @template Schema - The Zod schema type
 *
 * @param {Schema} schema - The Zod schema to validate the parsed object against
 *
 * @returns {Schema} - The parsed object
 */
export function json<Schema extends z.ZodTypeAny>(schema: Schema) {
	return z
		.string()
		.transform((value, context) => {
			try {
				return JSON.parse(value) as unknown;
			} catch {
				context.addIssue({
					code: z.ZodIssueCode.custom,
				});
				return z.NEVER;
			}
		})
		.pipe(schema)
		.or(schema);
}

/**
 * Unwraps a branded Zod object schema.
 *
 * @param {Schema | z.ZodBranded<Schema, Brand>} schema - The Zod object schema or the branded Zod object schema to unbrand.
 *
 * @returns {Schema} - The unbranded Zod object schema.
 */
export function unbrandObjectSchema<
	Schema extends z.AnyZodObject,
	Brand extends string,
>(schema: Schema | z.ZodBranded<Schema, Brand>): Schema {
	if ('unwrap' in schema) {
		return schema.unwrap();
	}

	return schema;
}
