import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import SectorsForm from '@/app/(logged-in)/my/[organizationId]/sectors/sectors-form.tsx';
import getAllSectors from '@/lib/get-all-sectors.ts';

export default withPageAuthRequired(async () => {
	const sectors = await getAllSectors();
	return (
		<SectorsForm sectors={sectors}/>
	);
});
