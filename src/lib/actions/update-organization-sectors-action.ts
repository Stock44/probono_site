'use server';
import {revalidatePath} from 'next/cache';
import {getSession} from '@auth0/nextjs-auth0';
import type {ServerActionResult} from '@/lib/server-action-result.ts';
import prisma from '@/lib/prisma.ts';

export default async function updateOrganizationSectorsAction(organizationId: number, sectorIds: number[]): Promise<ServerActionResult> {
	const session = await getSession();

	if (!session) {
		return {
			success: false,
			message: 'Not authenticated',
		};
	}

	try {
		await prisma.organization.update({
			where: {
				id: organizationId,
				owners: {
					some: {
						authId: session.user.sub as string,
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
