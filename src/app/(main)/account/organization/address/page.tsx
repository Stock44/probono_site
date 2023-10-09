import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import AddressInfoForm from '@/app/(main)/account/organization/address/address-info-form.tsx';
import {getAllStates} from '@/lib/get-all-states.tsx';

export default withPageAuthRequired(async () => {
	const states = await getAllStates();
	return (
		<div>
			<h1>asdf</h1>
			<AddressInfoForm states={states}/>
		</div>
	);
},
);
