import {cache} from 'react';
import prisma from '@/lib/prisma.ts';
import updateActiveOrganization from '@/lib/actions/update-active-organization.ts';

const hour = 60 * 60 * 1000;

const duration = 24 * hour;

export async function getOrganizationInvitation(invitationId: string) {
	return prisma.organizationInvitation.findUnique({
		where: {
			id: invitationId,
		},
		include: {
			organization: true,
			sender: true,
		},
	});
}

export async function isInvitationValid(invitationId: string): Promise<boolean> {
	const invite = await prisma.organizationInvitation.findUnique({
		where: {
			id: invitationId,
		},
	});

	if (!invite) {
		return false;
	}

	return invite.timestamp >= (new Date(Date.now() - duration));
}

export async function createOrganizationInvitation(recipient: string, organizationId: number, senderId: number) {
	return prisma.organizationInvitation.create({
		data: {
			organizationId,
			recipient,
			senderId,
		},
	});
}

export async function consumeOrganizationInvitation(invitationId: string, recipientUserId: number) {
	const invite = await prisma.organizationInvitation.findUnique({
		where: {
			id: invitationId,
		},
	});

	if (!invite) {
		throw new Error('Invitation not found');
	}

	if (invite.timestamp < (new Date(Date.now() - duration))) {
		throw new Error('Invitation expired');
	}

	await prisma.$transaction([
		prisma.organizationInvitation.deleteMany({
			where: {
				organizationId: invite.organizationId,
				recipient: invite.recipient,
			},
		}),
		prisma.organization.update({
			where: {
				id: invite.organizationId,
			},
			data: {
				owners: {
					connect: {
						id: recipientUserId,
					},
				},
			},
		}),
	]);

	return updateActiveOrganization(invite.organizationId);
}

export async function activeOrganizationInvitationExists(recipient: string, organizationId: number) {
	const existingInvite = await prisma.organizationInvitation.findFirst({
		where: {
			recipient,
			organizationId,
			timestamp: {
				gt: new Date(Date.now() - duration),
			},
		},
	});

	return Boolean(existingInvite);
}

export const getActiveOrganizationInvitations = cache(async (organizationId: number) => prisma.organizationInvitation.findMany({
	where: {
		organizationId,
		timestamp: {
			gt: new Date(Date.now() - duration),
		},
	},
	orderBy: {
		timestamp: 'desc',
	},
}));

export const getExpiredOrganizationInvitations = cache(async (organizationId: number) => prisma.organizationInvitation.findMany({
	where: {
		organizationId,
		timestamp: {
			lte: new Date(Date.now() - duration),
		},
	},
	orderBy: {
		timestamp: 'desc',
	},
}));
