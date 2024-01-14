import React from 'react';
import {getSession} from '@auth0/nextjs-auth0';
import {notFound} from 'next/navigation';
import SectorsForm from '@/app/(logged-in)/my/sectors/sectors-form.tsx';
import {getAllSectors} from '@/lib/models/sector.ts';
import prisma from '@/lib/prisma.ts';
import updateOrganizationSectorsAction from '@/lib/actions/update-organization-sectors-action.ts';

export type SectorsPageProps = {
	readonly searchParams: {
		readonly organization?: string;
	};
};

export default async function SectorsPage(props: SectorsPageProps) {
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
		select: {
			id: true,
			sectors: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!organization) {
		notFound();
	}

	const sectors = await getAllSectors();

	const action = updateOrganizationSectorsAction.bind(null, organization.id);

	return (
		<SectorsForm sectors={sectors} organization={organization} action={action}/>
	);
}
