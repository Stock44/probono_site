import {getSession} from '@auth0/nextjs-auth0';
import React from 'react';
import {redirect} from 'next/navigation';
import UserForm from '@/app/(logged-in)/onboarding/user/user-onboarding-form.tsx';
import prisma from '@/lib/prisma.ts';
import {AnimatedLayoutContainer} from 'geostats-ui';
import upsertUserAction from '@/lib/actions/upsert-user-action.ts';
import {type UserInit, type UserUpdate} from '@/lib/schemas/user.ts';
import {FormState} from '@/components/form';

export type UserOnboardingPageProps = {
	readonly searchParams: {
		readonly inviteId?: string;
	};
};

export default async function UserOnboardingPage(
	props: UserOnboardingPageProps,
) {
	const {searchParams} = props;
	const session = (await getSession())!;

	const user = session
		? await prisma.user.findUnique({
				where: {
					authId: session.user.sub as string,
				},
			})
		: null;

	async function upsertUserAndRedirectAction(
		state: FormState<UserUpdate | UserInit>,
		data: FormData,
	): Promise<FormState<UserUpdate | UserInit>> {
		'use server';

		const newState = await upsertUserAction(state, data);

		if (newState.success) {
			const href = searchParams.inviteId
				? `/onboarding/organization?inviteId=${searchParams.inviteId}`
				: '/onboarding/organization';

			redirect(href);
		}

		return newState;
	}

	return (
		<AnimatedLayoutContainer>
			<h1 className='text-2xl text-stone-50'>Datos personales</h1>
			<p className='mb-2 text-stone-300'>
				Para empezar, necesitamos unos pocos datos básicos sobre ti.
			</p>
			<UserForm
				user={user ?? undefined}
				defaultEmail={session.user.email as string}
				defaultFamilyName={session.user.family_name as string}
				defaultGivenName={session.user.given_name as string}
				action={upsertUserAndRedirectAction}
			/>
		</AnimatedLayoutContainer>
	);
}
