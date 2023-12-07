import React from 'react';
import {notFound, redirect} from 'next/navigation';
import GeneralInfoForm from '@/app/(logged-in)/my/[organizationId]/general/general-info-form.tsx';
import getAllVolunteerCountCategories from '@/lib/get-all-volunteer-count-categories.ts';
import getAllEmployeeCountCategories from '@/lib/get-all-employee-count-categories.ts';
import {getSessionUserOrganization} from '@/lib/models/user.ts';
import updateOrganizationAction from '@/app/(logged-in)/my/[organizationId]/update-organization-action.ts';

export type GeneralPageProps = {
	readonly params: {
		readonly organizationId: string;
	};
};

export default async function GeneralPage(props: GeneralPageProps) {
	const {params} = props;

	const organizationId = Number.parseInt(params.organizationId, 10);

	const organization = await getSessionUserOrganization(organizationId);

	if (!organization) {
		notFound();
	}

	const volunteerCountCategories = await getAllVolunteerCountCategories();
	const employeeCountCategories = await getAllEmployeeCountCategories();

	const action = updateOrganizationAction.bind(null, organizationId);

	return (

		<GeneralInfoForm action={action} organization={organization} volunteerCountCategories={volunteerCountCategories} employeeCountCategories={employeeCountCategories}/>
	);
}
