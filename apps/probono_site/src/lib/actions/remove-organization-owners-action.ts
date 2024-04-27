'use server';

import {internalErrorResult, type ServerActionResult} from '@/lib/server-action-result.ts';
import prisma from '@/lib/prisma.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {userAuthorizedForOrganization} from '@/lib/models/organization.ts';

export default async function removeOrganizationOwnersAction(organizationId: number, owners: number[]): Promise<ServerActionResult> {
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
			message: 'Not authorized to modify this organization',
		};
	}

	try {
		await prisma.organization.update({
			where: {
				id: organizationId,
			},
			data: {
				owners: {
					disconnect: owners.map(id => ({id})),
				},
			},
		});
	} catch {
		return internalErrorResult;
	}

	return {
		success: true,
	};
}
