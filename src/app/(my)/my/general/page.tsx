import React from 'react';
import {redirect} from 'next/navigation';
import GeneralInfoForm from '@/app/(my)/my/general/general-info-form.tsx';
import getAllVolunteerCountCategories from '@/lib/get-all-volunteer-count-categories.ts';
import getAllEmployeeCountCategories from '@/lib/get-all-employee-count-categories.ts';
import {getUserWithOrganizationFromSession} from '@/lib/user.ts';

export default async function GeneralPage() {
	const user = await getUserWithOrganizationFromSession();
	const organization = user?.organization;

	if (organization === null || organization === undefined) {
		return redirect('/onboarding');
	}

	const volunteerCountCategories = await getAllVolunteerCountCategories();
	const employeeCountCategories = await getAllEmployeeCountCategories();
	return (
		<GeneralInfoForm organization={organization} volunteerCountCategories={volunteerCountCategories} employeeCountCategories={employeeCountCategories}/>
	);
}
