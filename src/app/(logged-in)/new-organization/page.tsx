import React from 'react';
import OrganizationCreationForm from '@/components/organization-creation-form.tsx';
import createOrganizationAction from '@/lib/actions/create-organization-action.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import TopBar from '@/components/top-bar.tsx';
import LinkButton from '@/components/link-button.tsx';
import Footer from '@/components/footer.tsx';

export default async function NewOrganizationPage() {
	const user = await getUserFromSession();

	const action = createOrganizationAction.bind(null, user!.id);

	return (
		<div>
			<TopBar>
				<LinkButton href='/api/auth/logout' variant='secondary'>
					Cerrar sesión
				</LinkButton>
			</TopBar>
			<div className='min-h-[calc(100vh-theme(spacing.16))]'>
				<div className='w-fit mx-auto my-auto rounded border-stone-700 md:border p-8 mt-16 md:mt-24'>
					<h1 className='text-stone-300 text-2xl mb-4'>
						Nueva organización
					</h1>
					<OrganizationCreationForm action={action}/>
				</div>
			</div>

			<Footer/>
		</div>

	);
}
