import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {getAllCorporationTypes} from '@/lib/get-all-corporation-types.ts';
import LegalInfoForm from '@/app/(logged-in)/my/[organizationId]/legal/legal-info-form.tsx';
import {getUserWithOrganizationFromSession} from '@/lib/user.ts';

export default withPageAuthRequired(async () => {
	const corporationTypes = await getAllCorporationTypes();
	const user = await getUserWithOrganizationFromSession();

	if (!user?.organization) {
		redirect('/');
	}

	return (
		<div>
			<LegalInfoForm corporationTypes={corporationTypes} organization={user.organization}/>
		</div>
	);
});
