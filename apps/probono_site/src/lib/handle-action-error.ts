'use server';
import {ZodError} from 'zod';
import {type FormState} from 'geostats-ui/form/form.tsx';

export async function handleActionError<T>(
	previousState: FormState<T>,
	error: unknown,
): Promise<FormState<T>> {
	if (error instanceof ZodError) {
		return {
			...previousState,
			...error.formErrors,
			success: false,
		};
	}

	if (error instanceof Error) {
		return {
			...previousState,
			success: false,
			formErrors: [error.message],
			fieldErrors: {},
		};
	}

	return {
		...previousState,
		success: false,
		formErrors: ['Unknown form error'],
		fieldErrors: {},
	};
}
