'use server';
import {revalidatePath} from 'next/cache';
import type {FormState} from 'geostats-ui/form/form.tsx';
import {type UserUpdate, userUpdateSchema} from '@/lib/schemas/user.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {getUserFromSession, updateUser} from '@/lib/models/user.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

export default async function updateUserAction(
	state: FormState<UserUpdate>,
	data: FormData,
): Promise<FormState<UserUpdate>> {
	const user = await getUserFromSession();

	if (!user) {
		return {
			...state,
			success: false,
			formErrors: ['Not authenticated'],
		};
	}

	try {
		const parsedData = await decodeForm(data, userUpdateSchema);
		await updateUser(user.id, parsedData);
	} catch (error) {
		return handleActionError(state, error);
	}

	revalidatePath('/my/account');
	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
