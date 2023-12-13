import React from 'react';
import {redirect} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import OrganizationForm from '@/app/(logged-in)/onboarding/organization/organization-form.tsx';
import AnimatedLayoutContainer from '@/components/animated-layout-container.tsx';
import prisma from '@/lib/prisma.ts';
import createOrganizationAction from '@/lib/actions/create-organization-action.ts';

export default async function OrganizationOnboardingPage() {
	const session = (await getSession())!;

	const user = await prisma.user.findUnique({
		where: {
			authId: session.user.sub as string,
		},
	});

	if (!user) {
		redirect('/onboarding/user');
	}

	const action = createOrganizationAction.bind(null, user.id);

	return (
		<AnimatedLayoutContainer>
			<h1 className='text-2xl text-stone-50'>Datos de tu organización</h1>
			<p className='text-stone-300 mb-2'>
				También necesitamos algunos datos sobre tu organización.
			</p>
			<OrganizationForm action={action}/>
		</AnimatedLayoutContainer>
	);
}
