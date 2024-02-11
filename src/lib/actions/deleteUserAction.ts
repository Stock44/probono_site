import {redirect} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import type {FormState} from '@/components/form/form.tsx';
import {type UserDelete, userDeleteSchema} from '@/lib/schemas/user.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {authentication} from '@/lib/auth0.ts';
import {deleteUser} from '@/lib/models/user.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

export default async function deleteUserAction(state: FormState<UserDelete>, data: FormData): Promise<FormState<UserDelete>> {
	'use server';
	const session = await getSession();

	if (!session) {
		return {
			...state,
			formErrors: ['Not authenticated.'],
		};
	}

	try {
		const parsedData = await decodeForm(data, userDeleteSchema);

		// Confirm password
		await authentication.oauth.passwordGrant({
			username: session.user?.email as string,
			password: parsedData.password,
		});

		await deleteUser();
	} catch (error) {
		return handleActionError(state, error);
	}

	redirect('/');
}
