import type z from 'zod';

export const decodeForm = async <Schema extends z.ZodTypeAny>(
	formDataOrRequest: FormData | Request,
	schema: Schema,
): Promise<z.infer<Schema>> => {
	const formData
			= formDataOrRequest instanceof FormData
				? formDataOrRequest
				: await formDataOrRequest.clone().formData();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return schema.parse(Object.fromEntries(formData)) as z.infer<Schema>;
};
