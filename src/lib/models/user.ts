import {omit} from 'lodash';
import {getSession} from '@auth0/nextjs-auth0';
import {cache} from 'react';
import {type UserInit, type UserUpdate} from '@/lib/schemas/user.ts';
import prisma from '@/lib/prisma.ts';
import {management} from '@/lib/auth0.ts';

export const getFirstSessionUserOrganization = cache(async () => {
	const session = await getSession();

	if (!session) {
		return null;
	}

	return prisma.organization.findFirst({
		where: {
			owners: {
				some: {
					authId: session.user.sub as string,
				},
			},
		},
	});
});

export const getSessionUserOrganization = cache(
	async (id: number) => {
		const session = await getSession();

		if (!session) {
			return null;
		}

		return prisma.organization.findUnique({
			where: {
				id,
				owners: {
					some: {
						authId: session.user.sub as string,
					},
				},
			},
		});
	});

export const getUserFromSession = cache(async () => {
	const session = await getSession();

	if (!session) {
		return null;
	}

	return prisma.user.findUnique({
		where: {
			authId: session.user.sub as string,
		},
		include: {
			_count: {
				select: {
					organizations: true,
				},
			},
		},
	});
});

export const getUserFromSessionWithOrganizations = cache(async () => {
	const session = await getSession();
	if (!session) {
		return null;
	}

	return prisma.user.findUnique({
		where: {
			authId: session.user.sub as string,
		},
		include: {
			organizations: {
				select: {
					id: true,
					name: true,
					logoUrl: true,
				},
			},
			_count: {
				select: {
					organizations: true,
				},
			},
		},
	});
});

/**
 * Creates a new user with the given authId and initialization data.
 *
 * @param {string} authId - The unique identifier of the user in the central authentication system.
 * @param {UserInit} init - The initialization data for the user.
 *
 * @return {Promise<User>} - A promise that resolves with the created user object.
 */
export async function createUser(authId: string, init: UserInit) {
	return prisma.$transaction(async tx => {
		const user = await management.users.get({
			id: authId,
		});

		return tx.user.create({
			data: {
				...init,
				authId,
				email: user.data.email,
			},
		});
	});
}

/**
 * Updates a user in the database and in the authentication service.
 *
 * @param {number} id - The user ID.
 * @param {object} update - The properties to be updated.
 * @param {string} [update.email] - The new email address for the user.
 * @param {string} [update.password] - The new password for the user.
 * @returns {Promise<void>} - A Promise that resolves when the user is updated.
 */
export async function updateUser(id: number, update: UserUpdate) {
	await prisma.$transaction(async tx => {
		const {authId} = await tx.user.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				authId: true,
			},
		});

		if (update.email) {
			await management.users.update({
				id: authId,
			}, {
				email: update.email,
			});
		}

		if (update.password) {
			await management.users.update({
				id: authId,
			}, {
				password: update.password,
			});
		}

		await tx.user.update({
			where: {
				id,
			},
			data: omit(update, ['password']),
		});
	});
}
