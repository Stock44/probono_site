'use server';

import {getSession} from '@auth0/nextjs-auth0';
import {cookies} from 'next/headers';
import {revalidatePath} from 'next/cache';
import prisma from '@/lib/prisma.ts';

export default async function updateActiveOrganization(id: number) {
	const session = await getSession();

	if (!session) {
		return null;
	}

	const organization = (await prisma.organization.findUnique({
		where: {
			id,
			owners: {
				some: {
					authId: session.user.sub as string,
				},
			},
		},
	})) ?? (await prisma.organization.findFirstOrThrow({
		where: {
			owners: {
				some: {
					authId: session.user.sub as string,
				},
			},
		},
	}));

	cookies().set('organizationId', organization.id.toString());
	revalidatePath('/my');
}
