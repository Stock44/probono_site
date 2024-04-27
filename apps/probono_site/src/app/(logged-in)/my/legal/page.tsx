import React from 'react';
import {getAllCorporationTypes} from '@/lib/models/corporation-type.ts';
import LegalInfoForm from '@/app/(logged-in)/my/legal/legal-info-form.tsx';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';

export type LegalFormPageProps = {
	readonly searchParams: {
		readonly organization: string;
	};
};

export default async function LegalFormPage(props: LegalFormPageProps) {
	const organization = await getUsersActiveOrganization();

	const action = updateOrganizationAction.bind(null, organization.id);

	const corporationTypes = await getAllCorporationTypes();

	return (
		<main className='w-full'>
			<LegalInfoForm corporationTypes={corporationTypes} organization={organization} action={action}/>
		</main>
	);
}
