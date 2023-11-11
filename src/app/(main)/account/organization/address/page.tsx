import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import AddressInfoForm from '@/app/(main)/account/organization/address/address-info-form.tsx';
import {getAllStates} from '@/lib/get-all-states.tsx';
import getOrganizationFromSession from '@/lib/get-organization-from-session.ts';

export default withPageAuthRequired(async () => {
	const states = await getAllStates();
	const organization = await getOrganizationFromSession();
	return (
		<AddressInfoForm states={states} organization={organization}/>
	);
},
);
