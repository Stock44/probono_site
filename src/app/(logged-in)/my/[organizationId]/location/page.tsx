import React from 'react';
import {notFound} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import {type Address} from '@prisma/client';
import AddressInfoForm from '@/app/(logged-in)/my/[organizationId]/location/address-info-form.tsx';
import {getAllStates} from '@/lib/get-all-states.tsx';
import {getSessionUserOrganization} from '@/lib/models/user.ts';
import updateOrganizationAction from '@/app/(logged-in)/my/[organizationId]/update-organization-action.ts';
import prisma from '@/lib/prisma.ts';

export type LocationFormPageProps = {
	readonly params: {
		readonly organizationId: string;
	};
};

export default async function LocationFormPage(props: LocationFormPageProps) {
	const {params} = props;
	const organizationId = Number.parseInt(params.organizationId, 10);

	if (Number.isNaN(organizationId)) {
		notFound();
	}

	const session = (await getSession())!;

	const organization = await prisma.$transaction(async tx => {
		const result = await tx.organization.findUnique({
			where: {
				id: organizationId,
				owners: {
					some: {
						authId: session.user.sub as string,
					},
				},
			},
			include: {
				address: {
					include: {
						municipality: true,
					},
				},
			},
		});

		if (result?.address) {
			const location = (await tx.$queryRaw<Array<{
				location: [number, number];
			}>>`select array [st_x(location::geometry), st_y(location::geometry)] as location
          from "Address" as a
                   join public."Organization" o on a.id = o."addressId"
          where o.id = ${result.id}
          limit 1;`);

			return {
				...result,
				address: {
					...result.address,
					location: location.length > 0 ? location[0].location : null,
				},
			};
		}

		return result ? {
			...result,
			address: null,
		} : null;
	});

	if (!organization) {
		notFound();
	}

	const states = await getAllStates();

	const action = updateOrganizationAction.bind(null, organizationId);

	return (
		<AddressInfoForm states={states} organization={organization} action={action}/>
	);
}
