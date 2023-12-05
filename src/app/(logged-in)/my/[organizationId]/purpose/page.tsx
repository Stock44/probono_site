import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import PurposeInfoForm from './purpose-info-form.tsx';
import {getAllOrganizationCategories} from '@/lib/get-all-organization-categories.ts';
import {
	getAllOrganizationActivities,
} from '@/lib/get-all-organization-activities.ts';
import {getAllBeneficiaries} from '@/lib/get-all-beneficiaries.ts';
import {getAllAgeGroups} from '@/lib/get-all-age-groups.ts';
import {getOrganizationWithPurposeDataFromSession} from '@/lib/models/organization.ts';

export default async function PurposePage() {
	const organizationCategories = await getAllOrganizationCategories();
	const organizationActivities = await getAllOrganizationActivities();
	const beneficiaries = await getAllBeneficiaries();
	const ageGroups = await getAllAgeGroups();
	const organization = await getOrganizationWithPurposeDataFromSession();

	if (organization === null || organization === undefined) {
		redirect('/onboarding');
	}

	return (
		<PurposeInfoForm organization={organization} organizationCategories={organizationCategories} activities={organizationActivities} beneficiaries={beneficiaries} ageGroups={ageGroups}/>
	);
}
