import React from 'react';
import {notFound} from 'next/navigation';
import SectorsForm from '@/app/(logged-in)/my/sectors/sectors-form.tsx';
import {getAllSectors} from '@/lib/models/sector.ts';
import prisma from '@/lib/prisma.ts';
import updateOrganizationSectorsAction from '@/lib/actions/update-organization-sectors-action.ts';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';

export type SectorsPageProps = {
	readonly searchParams: {
		readonly organization?: string;
	};
};

export default async function SectorsPage(props: SectorsPageProps) {
	const baseOrganization = await getUsersActiveOrganization();
	const organizationSectors = await prisma.organization.findUniqueOrThrow({
		where: {
			id: baseOrganization.id,
		},
		select: {
			sectors: {
				select: {
					id: true,
				},
			},
		},
	});

	const organization = {
		...baseOrganization,
		...organizationSectors,
	};

	if (!organization) {
		notFound();
	}

	const sectors = await getAllSectors();

	const action = updateOrganizationSectorsAction.bind(null, organization.id);

	return (
		<SectorsForm sectors={sectors} organization={organization} action={action}/>
	);
}
