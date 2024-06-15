'use server';
import {revalidatePath} from 'next/cache';
import type {ServerActionResult} from '@/lib/server-action-result.ts';
import prisma from '@/lib/prisma.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {userAuthorizedForOrganization} from '@/lib/models/organization.ts';

export default async function updateOrganizationSectorsAction(
	organizationId: number,
	sectorIds: number[],
): Promise<ServerActionResult> {
	const user = await getUserFromSession();

	if (!user) {
		return {
			success: false,
			message: 'Not authenticated',
		};
	}

	if (!(await userAuthorizedForOrganization(user.id, organizationId))) {
		return {
			success: false,
			message: 'Not authorized to modify organization',
		};
	}

	try {
		await prisma.organization.update({
			where: {
				id: organizationId,
				owners: {
					some: {
						id: user.id,
					},
				},
			},
			data: {
				sectors: {
					set: sectorIds.map(id => ({
						id,
					})),
				},
			},
		});

		revalidatePath('/my/sectors');

		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				name: error.name,
				message: error.message,
			};
		}

		return {
			success: false,
			message: 'Unknown server error',
		};
	}
}
