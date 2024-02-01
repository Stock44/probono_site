import React from 'react';
import {notFound} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import PurposeInfoForm from './purpose-info-form.tsx';
import {getAllOrganizationCategories} from '@/lib/models/organization-category.ts';
import {getAllActivities} from '@/lib/models/activity.ts';
import {getAllBeneficiaries} from '@/lib/models/beneficiary.ts';
import {getAllAgeGroups} from '@/lib/models/age-group.ts';
import prisma from '@/lib/prisma.ts';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';

export type PurposePageProps = {
	readonly searchParams: {
		readonly organization: string;
	};
};

export default async function PurposePage(props: PurposePageProps) {
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
		<PurposeInfoForm action={action} organization={organization} organizationCategories={organizationCategories} activities={activities} beneficiaries={beneficiaries} ageGroups={ageGroups}/>
	);
}
