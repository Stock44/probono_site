import React from 'react';
import {notFound} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import PurposeInfoForm from './purpose-info-form.tsx';
import {getAllOrganizationCategories} from '@/lib/get-all-organization-categories.ts';
import {
	getAllActivities,
} from '@/lib/get-all-activities.ts';
import {getAllBeneficiaries} from '@/lib/get-all-beneficiaries.ts';
import {getAllAgeGroups} from '@/lib/get-all-age-groups.ts';
import prisma from '@/lib/prisma.ts';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';

export type PurposePageProps = {
	readonly searchParams: {
		readonly organization: string;
	};
};

export default async function PurposePage(props: PurposePageProps) {
	const {searchParams} = props;

	const session = (await getSession())!;

	const organizationId = searchParams.organization ? Number.parseInt(searchParams.organization, 10) : undefined;
	const organization = await prisma.organization.findFirst({
		where: {
			id: organizationId,
			owners: {
				some: {
					authId: session.user.sub as string,
				},
			},
		},
		include: {
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

	if (!organization) {
		notFound();
	}

	const organizationCategories = await getAllOrganizationCategories();
	const activities = await getAllActivities();
	const beneficiaries = await getAllBeneficiaries();
	const ageGroups = await getAllAgeGroups();

	const action = updateOrganizationAction.bind(null, organization.id);

	return (
		<PurposeInfoForm action={action} organization={organization} organizationCategories={organizationCategories} activities={activities} beneficiaries={beneficiaries} ageGroups={ageGroups}/>
	);
}
