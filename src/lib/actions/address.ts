'use server';
import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {omit} from 'lodash';
import {type FormState} from '@/components/form.tsx';
import {type Address, addressSchema} from '@/lib/schemas/address.ts';
import {handleErrorAction} from '@/lib/actions/utils.ts';
import {decodeForm} from '@/lib/schemas/form-utils.ts';
import prisma from '@/lib/prisma.ts';

export async function upsertOrganizationAddress(previousState: FormState<Address>, data: FormData): Promise<FormState<Address>> {
	const session = await getSession();

	if (session === null || session === undefined) {
		redirect('/');
	}

	try {
		const address = await decodeForm(data, addressSchema);

		await prisma.$transaction(async tx => {
			// This query could be much more concise, but because of https://github.com/prisma/prisma/issues/21182
			// i'm unable to simplify it
			const userWithOrganization = await tx.user.findUniqueOrThrow({
				where: {
					authId: session.user.sub as string,
				},
				include: {
					organization: true,
				},
			});

			if (userWithOrganization.organizationId === null) {
				throw new Error('Unknown organization');
			}

			await tx.organization.update({
				where: {
					id: userWithOrganization.organizationId,
				},
				data: {
					address: {
						upsert: {
							create: omit(address, 'location'),
							update: omit(address, 'location'),
						},
					},
				},
			});
			await tx.$queryRaw`update "Address" 
                         set location=point(${address.location[0]}, ${address.location[1]})
                         from "Address" as a
                                  join "Organization" as o on a.id = o."addressId"
                         where o.id = ${userWithOrganization.organizationId}`;
		});
	} catch (error) {
		return handleErrorAction(previousState, error);
	}

	return {
		...previousState,
		formErrors: [],
		fieldErrors: {},
	};
}
