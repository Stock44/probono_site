import React from 'react';
import {notFound} from 'next/navigation';
import {getSession} from '@auth0/nextjs-auth0';
import AddressInfoForm from '@/app/(logged-in)/my/location/address-info-form.tsx';
import {getAllStates} from '@/lib/models/state';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import prisma from '@/lib/prisma.ts';

export type LocationFormPageProps = {
	readonly searchParams: {
		readonly organization: string;
	};
};

export default async function LocationFormPage(props: LocationFormPageProps) {
	const {searchParams} = props;

	const session = (await getSession())!;

	const organizationId = searchParams.organization ? Number.parseInt(searchParams.organization, 10) : undefined;

	const organization = await prisma.$transaction(async tx => {
		const result = await prisma.organization.findFirst({
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

	const action = updateOrganizationAction.bind(null, organization.id);

	return (
		<AddressInfoForm states={states} organization={organization} action={action}/>
	);
}
