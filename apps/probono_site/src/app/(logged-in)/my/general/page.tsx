import React from 'react';
import GeneralInfoForm from '@/app/(logged-in)/my/general/general-info-form.tsx';
import {getAllVolunteerCountCategories} from '@/lib/models/volunteer-count-category.ts';
import {getAllEmployeeCountCategories} from '@/lib/models/employee-count-category.ts';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import getAllIncomeCategories from '@/lib/get-all-income-categories.ts';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';
import prisma from '@/lib/prisma.ts';

export default async function GeneralPage() {
	const organization = await getUsersActiveOrganization();

	const volunteerCountCategories = await getAllVolunteerCountCategories();
	const employeeCountCategories = await getAllEmployeeCountCategories();
	const incomeCategories = await getAllIncomeCategories();

	const action = updateOrganizationAction.bind(null, organization.id);

	async function deleteOrganizationAction() {
		'use server';

		const userOrganization = await getUsersActiveOrganization();

		await prisma.organization.delete({
			where: {
				id: userOrganization.id,
			},
		});
	}

	return (
		<main className='w-full'>
			<GeneralInfoForm action={action} organization={organization} volunteerCountCategories={volunteerCountCategories} employeeCountCategories={employeeCountCategories} incomeCategories={incomeCategories} deleteOrganization={deleteOrganizationAction}/>
		</main>
	);
}
