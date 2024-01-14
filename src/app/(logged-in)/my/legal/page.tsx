import React from 'react';
import {notFound} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import {getAllCorporationTypes} from '@/lib/models/corporation-type.ts';
import LegalInfoForm from '@/app/(logged-in)/my/legal/legal-info-form.tsx';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import prisma from '@/lib/prisma.ts';

export type LegalFormPageProps = {
	readonly searchParams: {
		readonly organization: string;
	};
};

export default async function LegalFormPage(props: LegalFormPageProps) {
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

	const action = updateOrganizationAction.bind(null, organization.id);

	const corporationTypes = await getAllCorporationTypes();

	return (
		<div>
			<LegalInfoForm corporationTypes={corporationTypes} organization={organization} action={action}/>
		</div>
	);
}
