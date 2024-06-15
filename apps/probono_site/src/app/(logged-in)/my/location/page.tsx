import React from 'react';
import {
	type Address,
	type Municipality,
	type Organization,
} from '@prisma/client';
import AddressInfoForm from '@/app/(logged-in)/my/location/address-info-form.tsx';
import {getAllStates} from '@/lib/models/state.ts';
import updateOrganizationAction from '@/lib/actions/update-organization-action.ts';
import prisma from '@/lib/prisma.ts';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';

type OrganizationWithAddress = Organization & {
	address:
		| (Address & {
				readonly municipality: Municipality;
				readonly location: [number, number] | null;
		  })
		| null;
};

export default async function LocationFormPage() {
	const baseOrganization = await getUsersActiveOrganization();

	const organization: OrganizationWithAddress = {
		...baseOrganization,
		address: null,
	};

	if (organization.addressId) {
		organization.address = await prisma.$transaction(async tx => {
			const baseAddress = await tx.address.findUniqueOrThrow({
				where: {
					id: organization.addressId!,
				},
				include: {
					municipality: true,
				},
			});
			const location = await tx.$queryRaw<
				Array<{
					location: [number, number];
				}>
			>`select array [st_x(location::geometry), st_y(location::geometry)] as location
              from "Address" as a
                       join public."Organization" o on a.id = o."addressId"
              where o.id = ${organization.id}
              limit 1;`;

			return {
				...baseAddress,
				location: location[0].location,
			};
		});
	}

	const states = await getAllStates();

	const action = updateOrganizationAction.bind(null, organization.id);

	return (
		<main className='w-full'>
			<AddressInfoForm
				states={states}
				organization={organization}
				action={action}
			/>
		</main>
	);
}
