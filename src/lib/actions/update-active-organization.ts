'use server';

import {cookies} from 'next/headers';
import {revalidatePath} from 'next/cache';
import prisma from '@/lib/prisma.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

export default async function updateActiveOrganization(id: number) {
	const user = await getUserFromSession();

	if (!user) {
		return null;
	}

	const organization = (await prisma.organization.findUnique({
		where: {
			id,
			owners: {
				some: {
					id: user.id,
				},
			},
		},
	})) ?? (await prisma.organization.findFirstOrThrow({
		where: {
			owners: {
				some: {
					id: user.id,
				},
			},
		},
	}));

	cookies().set('organizationId', organization.id.toString());
	revalidatePath('/my');
}
