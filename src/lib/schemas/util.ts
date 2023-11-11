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

export function validators<Schema extends z.AnyZodObject>(schema: Schema) {
	const schemas = schema.shape as {
		[K in keyof Schema['shape']]: z.ZodSchema;
	};

	return Object.fromEntries(Object.entries(schemas).map(
		([key, validator]) =>
			[
				key,
				(value: unknown) => {
					const result = validator.safeParse(value);
					// If (key === 'entryHour' || key === 'exitHour') {
					// 	console.log(result);
					// }

					return result.success ? null : result.error.issues.map(issue => issue.message).join(' ');
				},
			])) as {
		[K in keyof Schema['shape']]: (value: unknown) => null | string;
	};
}

export function urlHostnameRefinement(hostname: string) {
	const hostnames = new Set([`${hostname}.com`, `www.${hostname}.com`]);
	return (url: string, ctx: z.RefinementCtx) => {
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
	};
}
