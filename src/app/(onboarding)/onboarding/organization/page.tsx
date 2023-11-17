import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import React from 'react';
import {redirect} from 'next/navigation';
import OrganizationForm from '@/app/(onboarding)/onboarding/organization/organization-form.tsx';
import {getUserByAuthId} from '@/lib/user.ts';

export default async function OrganizationOnboardingPage() {
	const session = (await getSession())!;
	const person = (await getUserByAuthId(session.user.sub as string));

	if (person === null) {
		redirect('/onboarding/user');
	}

	return (
		<main>
			<h1 className='text-2xl text-stone-50'>Datos de tu organización</h1>
			<p className='text-stone-300 mb-2'>
				Tambien necesitamos algunos datos sobre tu organización.
			</p>
			<OrganizationForm/>
		</main>
	);
}
