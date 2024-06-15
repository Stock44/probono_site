import {getSession} from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

const reauthTime = 180; // 3 mins max for reauthentication

export class ReauthenticationExpiredError extends Error {}

export class NoReauthenticationRequestedError extends Error {}

/**
 * Request user reauthentication.
 *
 * This method is used to request the user to reauthenticate. It checks if the user is authenticated
 * by retrieving the user information from the session. If the user is not authenticated, it throws
 * an error. Otherwise, it creates a user reauthentication record in the database.
 *
 * @throws {Error} When the user is not authenticated.
 *
 * @returns {Promise<void>} A Promise that resolves when the user reauthentication record is created successfully.
 */
export async function requestUserReauthentication() {
	const session = await getSession();

	if (!session) {
		throw new Error('Not authenticated');
	}

	const user = await getUserFromSession();

	if (!user) {
		throw new Error('Could not find user information for current session');
	}

	await prisma.userReauthentication.create({
		data: {
			userId: user.id,
			consumed: false,
			time: new Date(),
		},
	});
}

/**
 * Consume User Reauthentication
 *
 * This method is used to consume a user reauthentication request. It checks if a user session exists,
 * retrieves the user from the session, and checks if there is a pending unconsumed reauthentication request
 * for the user. If a reauthentication request exists and is within the valid time range, it updates the
 * reauthentication request status to consumed.
 *
 * @throws {Error} - Throws an error if user session is not available or user is not authenticated.
 * @throws {NoReauthenticationRequestedError} - Throws an error if there is no pending reauthentication request.
 * @throws {ReauthenticationExpiredError} - Throws an error if the reauthentication request is expired.
 *
 * @returns {Promise<void>} - Returns a promise that resolves when the reauthentication request is successfully consumed.
 */
export async function consumeUserReauthentication(): Promise<void> {
	const session = await getSession();

	if (!session) {
		throw new Error('Not authenticated');
	}

	const user = await getUserFromSession();

	if (!user) {
		throw new Error('Could not find user information for current session');
	}

	// Get most recent reauthentication attempt
	const reauth = await prisma.userReauthentication.findFirst({
		where: {
			userId: user.id,
			consumed: false,
		},
		orderBy: {
			time: 'desc',
		},
	});

	if (!reauth) {
		throw new NoReauthenticationRequestedError();
	}

	const timeDelta =
		(session.user.auth_time as number) - reauth.time.getTime() / 1000;

	if (timeDelta < 0 || timeDelta > reauthTime) {
		throw new ReauthenticationExpiredError();
	}

	await prisma.userReauthentication.update({
		where: {
			id: reauth.id,
		},
		data: {
			consumed: true,
		},
	});
}
