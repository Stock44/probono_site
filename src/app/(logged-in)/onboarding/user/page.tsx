import {getSession} from '@auth0/nextjs-auth0';
import React from 'react';
import {redirect} from 'next/navigation';
import UserForm from '@/app/(logged-in)/onboarding/user/user-onboarding-form.tsx';
import {createUser, getUserFromSession, updateUser} from '@/lib/models/user.ts';
import {type UserInit, userInitSchema, type UserUpdate, userUpdateSchema} from '@/lib/schemas/user.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {type FormState} from '@/components/form.tsx';
import prisma from '@/lib/prisma.ts';
import AnimatedLayoutContainer from '@/components/animated-layout-container.tsx';

export default async function UserOnboardingPage() {
	const session = (await getSession())!;

	const user = session ? await prisma.user.findUnique({
		where: {
			authId: session.user.sub as string,
		},
	}) : null;

	const action = async (state: FormState<UserInit | UserUpdate>, data: FormData) => {
		'use server';
		try {
			const user = await getUserFromSession();

			if (user) {
				const parsedData = await decodeForm(data, userUpdateSchema);
				await updateUser(user.id, parsedData);
			} else {
				const parsedData = await decodeForm(data, userInitSchema);
				await createUser(session.user.sub as string, parsedData);
			}
		} catch (error) {
			console.log(error);
			return handleActionError(state, error);
		}

		redirect('/onboarding/organization');
	};

	return (
		<AnimatedLayoutContainer>
			<h1 className='text-2xl text-stone-50'>Datos personales</h1>
			<p className='text-stone-300 mb-2'>
				Para empezar, necesitamos unos pocos datos basicos sobre ti.
			</p>
			<UserForm user={user ?? undefined} defaultEmail={session.user.email as string} action={action}/>
		</AnimatedLayoutContainer>
	);
}
