import React from 'react';
import OrganizationCreationForm from '@/components/organization-creation-form.tsx';
import createOrganizationAction from '@/lib/actions/create-organization-action.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

export default async function NewOrganizationPage() {
	const user = await getUserFromSession();

	const action = createOrganizationAction.bind(null, user!.id);

	return (
		<div className='w-fit mx-auto my-auto rounded border-stone-700 border p-8'>
			<h1 className='text-stone-300 text-2xl mb-4'>
				Nueva organización
			</h1>
			<OrganizationCreationForm action={action}/>
		</div>
	);
}
