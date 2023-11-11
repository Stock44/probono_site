import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import React from 'react';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';
import PersonForm from '@/app/(onboarding)/onboarding/person/person-form.tsx';

export default withPageAuthRequired(
	async () => {
		const {user} = (await getSession())!;

		const person = await getPersonByAuthId(user.sub as string);

		return (
			<main>
				<h1 className='text-2xl text-stone-50'>Datos personales</h1>
				<p className='text-stone-300 mb-2'>
					Para empezar, necesitamos unos pocos datos basicos sobre ti.
				</p>
				<PersonForm
					person={person ?? undefined}
				/>
			</main>
		);
	},
	{returnTo: '/api/auth/login'},
);
