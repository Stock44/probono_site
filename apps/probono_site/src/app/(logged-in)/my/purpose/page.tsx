import React from 'react';
import PurposeInfoForm from './purpose-info-form.tsx';
import {getAllOrganizationCategories} from '@/lib/models/organization-category.ts';
import {getAllActivities} from '@/lib/models/activity.ts';
import {getAllBeneficiaries} from '@/lib/models/beneficiary.ts';
import {getAllAgeGroups} from '@/lib/models/age-group.ts';
import prisma from '@/lib/prisma.ts';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';

export default async function PurposePage() {
	const baseOrganization = await getUsersActiveOrganization();
	const organizationIncludes = await prisma.organization.findUniqueOrThrow({
		where: {
			id: baseOrganization.id,
		},
		select: {
			activities: {
				include: {
					activity: true,
				},
			},
			beneficiaries: true,
			ageGroups: {
				include: {
					ageGroup: true,
				},
			},
		},
	});

	const organization = {
		...baseOrganization,
		...organizationIncludes,
	};

	const organizationCategories = await getAllOrganizationCategories();
	const activities = await getAllActivities();
	const beneficiaries = await getAllBeneficiaries();
	const ageGroups = await getAllAgeGroups();

	const action = updateOrganizationAction.bind(null, organization.id);

	return (
		<main className='w-full'>
			<PurposeInfoForm
				action={action}
				organization={organization}
				organizationCategories={organizationCategories}
				activities={activities}
				beneficiaries={beneficiaries}
				ageGroups={ageGroups}
			/>
		</main>
	);
}
