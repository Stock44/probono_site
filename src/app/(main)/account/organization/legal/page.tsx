import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getAllCorporationTypes} from '@/lib/get-all-corporation-types.ts';
import LegalInfoForm from '@/app/(main)/account/organization/legal/legal-info-form.tsx';

export default withPageAuthRequired(async () => {
	const corporationTypes = await getAllCorporationTypes();
	return (
		<div>
			<LegalInfoForm corporationTypes={corporationTypes}/>
		</div>
	);
});
