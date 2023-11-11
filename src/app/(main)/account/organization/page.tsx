import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import GeneralInfoForm from '@/app/(main)/account/organization/general-info-form.tsx';
import getOrganizationFromSession from '@/lib/get-organization-from-session.ts';
import getAllVolunteerCountCategories from '@/lib/get-all-volunteer-count-categories.ts';
import getAllEmployeeCountCategories from '@/lib/get-all-employee-count-categories.ts';

export default withPageAuthRequired(async () => {
	const organization = await getOrganizationFromSession();
	const volunteerCountCategories = await getAllVolunteerCountCategories();
	const employeeCountCategories = await getAllEmployeeCountCategories();
	return (
		<GeneralInfoForm organization={organization} volunteerCountCategories={volunteerCountCategories} employeeCountCategories={employeeCountCategories}/>
	);
});
