import React from 'react';
import {notFound} from 'next/navigation';
import {getAllCorporationTypes} from '@/lib/get-all-corporation-types.ts';
import LegalInfoForm from '@/app/(logged-in)/my/[organizationId]/legal/legal-info-form.tsx';
import {getSessionUserOrganization} from '@/lib/models/user.ts';
import updateOrganizationAction from '@/app/(logged-in)/my/[organizationId]/update-organization-action.ts';

export type LegalFormPageProps = {
	readonly params: {
		readonly organizationId: string;
	};
};

export default async function LegalFormPage(props: LegalFormPageProps) {
	const {params} = props;
	const organizationId = Number.parseInt(params.organizationId, 10);

	if (Number.isNaN(organizationId)) {
		notFound();
	}

	const corporationTypes = await getAllCorporationTypes();
	const organization = await getSessionUserOrganization(organizationId);

	if (!organization) {
		notFound();
	}

	const action = updateOrganizationAction.bind(null, organizationId);

	return (
		<div>
			<LegalInfoForm corporationTypes={corporationTypes} organization={organization} action={action}/>
		</div>
	);
}
