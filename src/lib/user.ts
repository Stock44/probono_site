import {cache} from 'react';
import {getSession} from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma.ts';

export const getUserByAuthId = cache(async (authId: string) => prisma.user.findUnique({
	where: {
		authId,
	},
}));

export async function getUserWithOrganizationFromSession() {
	const session = await getSession();

	if (session === null || session === undefined) {
		return undefined;
	}

	return prisma.user.findUnique({
		where: {
			authId: session.user.sub as string,
		},
		include: {
			organization: true,
		},
	});
}

export type UserWithOrganization = Exclude<Awaited<ReturnType<typeof getUserWithOrganizationFromSession>>, undefined>;
