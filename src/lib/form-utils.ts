import type z from 'zod';

/**
 * Preprocesses a form value, changing empty strings into null values.
 *
 * @param {unknown} value - The value to preprocess.
 * @return {unknown} - The preprocessed value.
 */
export function preprocessFormValue(value: unknown): unknown {
	if (Number.isNaN(value)) {
		return null;
	}

	if (typeof value !== 'string') {
		return value;
	}

	return value.trim() === ''
		? null
		: value;
}

/**
 * Decodes form data or request body using a given schema.
 *
 * @param {FormData | Request} formDataOrRequest - The form data or request object to decode.
 * @param {Schema} schema - The schema to decode the form data or request body against.
 * @returns {Promise<z.infer<Schema>>} The decoded form data or request body.
 */
export const decodeForm = async <Schema extends z.ZodTypeAny>(
	formDataOrRequest: FormData | Request,
	schema: Schema,
): Promise<z.infer<Schema>> => {
	const formData
			= formDataOrRequest instanceof FormData
				? formDataOrRequest
				: await formDataOrRequest.clone().formData();

	const data = Object.fromEntries([...formData].map(([key, value]) => [key, preprocessFormValue(value)]));

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return schema.parse(data) as z.infer<Schema>;
};

/**
 * Returns a set of form validators for a given schema.
 *
 * @param {Schema} schema - The schema object to generate validators for.
 * @returns An object containing validators for each property in the schema.
 */
export function formValidators<Schema extends z.AnyZodObject>(schema: Schema) {
	const schemas = schema.shape as {
		[K in keyof Schema['shape']]: z.ZodSchema;
	};

	return Object.fromEntries(Object.entries(schemas).map(
		([key, validator]) =>
			[
				key,
				(value: unknown) => {
					const result = validator.safeParse(preprocessFormValue(value));
					// If (key === 'entryHour' || key === 'exitHour') {
					// 	console.log(result);
					// }

					return result.success ? null : result.error.issues.map(issue => issue.message).join(' ');
				},
			])) as {
		[K in keyof Schema['shape']]: (value: unknown) => null | string;
	};
}
