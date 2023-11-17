import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import React from 'react';
import UserForm from '@/app/(onboarding)/onboarding/user/person-form.tsx';
import {getUserByAuthId} from '@/lib/user.ts';

export default withPageAuthRequired(
	async () => {
		const {user: authUser} = (await getSession())!;

		const user = await getUserByAuthId(authUser.sub as string);

		return (
			<main>
				<h1 className='text-2xl text-stone-50'>Datos personales</h1>
				<p className='text-stone-300 mb-2'>
					Para empezar, necesitamos unos pocos datos basicos sobre ti.
				</p>
				<UserForm
					user={user ?? undefined}
				/>
			</main>
		);
	},
	{returnTo: '/api/auth/login'},
);
