import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import GeneralInfoForm from '@/app/(main)/account/organization/general-info-form.tsx';
import getOrganizationFromSession from '@/lib/get-organization-from-session.ts';

export default withPageAuthRequired(async () => {
	const organization = await getOrganizationFromSession();
	return (
		<GeneralInfoForm organization={organization}/>
	);
});
