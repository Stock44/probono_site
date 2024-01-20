import React from 'react';
import {getSession} from '@auth0/nextjs-auth0';
import {notFound} from 'next/navigation';
import GeneralInfoForm from '@/app/(logged-in)/my/general/general-info-form.tsx';
import {getAllVolunteerCountCategories} from '@/lib/models/volunteer-count-category.ts';
import {getAllEmployeeCountCategories} from '@/lib/models/employee-count-category.ts';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import prisma from '@/lib/prisma.ts';
import getAllIncomeCategories from '@/lib/get-all-income-categories.ts';

export type GeneralPageProps = {
	readonly searchParams: {
		readonly organization?: string;
	};
};

export default async function GeneralPage(props: GeneralPageProps) {
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
	});

	if (!organization) {
		notFound();
	}

	const volunteerCountCategories = await getAllVolunteerCountCategories();
	const employeeCountCategories = await getAllEmployeeCountCategories();
	const incomeCategories = await getAllIncomeCategories();

	const action = updateOrganizationAction.bind(null, organization.id);

	return (
		<GeneralInfoForm action={action} organization={organization} volunteerCountCategories={volunteerCountCategories} employeeCountCategories={employeeCountCategories} incomeCategories={incomeCategories}/>
	);
}
