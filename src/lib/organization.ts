import {getSession} from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma.ts';

export async function getOrganizationWithPurposeDataFromSession() {
	const session = await getSession();

	if (session === null || session === undefined) {
		return undefined;
	}

	return prisma.organization.findFirstOrThrow({
		where: {
			owners: {
				some: {
					authId: session.user.sub as string,
				},
			},
		},
		include: {
			organizationAgeGroups: {
				include: {
					ageGroup: true,
				},
			},
			organizationBeneficiaries: true,
			activities: {
				include: {
					activity: true,
				},
				orderBy: {
					priority: 'asc',
				},
			},
		},
	});
}

export type OrganizationWithPurposeData = Exclude<Awaited<ReturnType<typeof getOrganizationWithPurposeDataFromSession>>, undefined>;
