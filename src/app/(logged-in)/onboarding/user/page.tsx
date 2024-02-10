import {getSession} from '@auth0/nextjs-auth0';
import React from 'react';
import UserForm from '@/app/(logged-in)/onboarding/user/user-onboarding-form.tsx';
import prisma from '@/lib/prisma.ts';
import AnimatedLayoutContainer from '@/components/animated-layout-container.tsx';
import upsertUserAction from '@/lib/actions/upsert-user-action.ts';

export default async function UserOnboardingPage() {
	const session = (await getSession())!;

	const user = session ? await prisma.user.findUnique({
		where: {
			authId: session.user.sub as string,
		},
	}) : null;

	return (
		<AnimatedLayoutContainer>
			<h1 className='text-2xl text-stone-50'>Datos personales</h1>
			<p className='text-stone-300 mb-2'>
				Para empezar, necesitamos unos pocos datos básicos sobre ti.
			</p>
			<UserForm user={user ?? undefined} defaultEmail={session.user.email as string} defaultFamilyName={session.user.family_name as string} defaultGivenName={session.user.given_name as string} action={upsertUserAction}/>
		</AnimatedLayoutContainer>
	);
}
