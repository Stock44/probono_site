import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import AddressInfoForm from '@/app/(my)/my/location/address-info-form.tsx';
import {getAllStates} from '@/lib/get-all-states.tsx';
import {getUserWithOrganizationFromSession} from '@/lib/user.ts';

export default withPageAuthRequired(async () => {
	const states = await getAllStates();
	const user = await getUserWithOrganizationFromSession();

	const organization = user?.organization;

	if (organization === undefined || organization === null) {
		redirect('/onboarding');
	}

	return (
		<AddressInfoForm states={states} organization={organization}/>
	);
},
);
