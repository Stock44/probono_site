import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import PurposeInfoForm from './purpose-info-form.tsx';
import {getAllOrganizationCategories} from '@/lib/get-all-organization-categories.ts';
import {
	getAllOrganizationActivitiesByCategory,
} from '@/lib/get-all-organization-activities.ts';
import {getAllBeneficiaries} from '@/lib/get-all-beneficiaries.ts';

export default withPageAuthRequired(async () => {
	const organizationCategories = await getAllOrganizationCategories();
	const organizationActivities = await getAllOrganizationActivitiesByCategory();
	const beneficiaries = await getAllBeneficiaries();
	const ageGroups = await getAllBeneficiaries();
	return (
		<div className='mt-4'>
			<PurposeInfoForm organizationCategories={organizationCategories} organizationActivities={organizationActivities} beneficiaries={beneficiaries} ageGroups={ageGroups}/>
		</div>
	);
});
