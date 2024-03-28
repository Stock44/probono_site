import React from 'react';
import {redirect} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import PasswordForm from '@/app/(logged-in)/my/account/password/password-form.tsx';
import {type PasswordUpdate, passwordUpdateSchema} from '@/lib/schemas/password.ts';
import {type FormState} from '@/components/form/form.tsx';
import {decodeForm} from '@/lib/form-utils.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {authentication, management} from '@/lib/auth0.ts';

export default async function AccountPage() {
	const action = async (state: FormState<PasswordUpdate>, data: FormData): Promise<FormState<PasswordUpdate>> => {
		'use server';
		const session = await getSession();

		if (!session) {
			return {
				...state,
				success: false,
				formErrors: ['Not authenticated'],
			};
		}

		console.log(session.user);

		try {
			const parsedData = await decodeForm(data, passwordUpdateSchema);

			// Check the password
			await authentication.oauth.passwordGrant({
				username: session.user.email as string,
				password: parsedData.currentPassword,
			});

			await management.users.update({
				id: session.user.sub as string,
			}, {
				password: parsedData.password,
			});
		} catch (error) {
			return handleActionError(state, error);
		}

		redirect('/my/account');
	};

	const session = await getSession();
	const sessionType = session?.user?.sub.split('-')[0] as string;

	if (sessionType == 'google') {
		redirect('/my/account')
	}

	return (
		<main className='w-full'>
			<h1 className='text-stone-200 text-4xl mb-2'>
				Cambio de contraseña
			</h1>
			<PasswordForm action={action}/>
		</main>
	);
}
