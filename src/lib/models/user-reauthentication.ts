import {getSession} from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

const reauthTime = 180; // 3 mins max for reauthentication

export class ReauthenticationExpiredError extends Error {}

export class NoReauthenticationRequestedError extends Error {}

export async function requestUserReauthentication() {
	const user = await getUserFromSession();

	if (!user) {
		throw new Error('not authenticated');
	}

	await prisma.userReauthentication.create({
		data: {
			userId: user.id,
			consumed: false,
			time: new Date(),
		},
	});
}

export async function consumeUserReauthentication() {
	const session = await getSession();

	if (!session) {
		throw new Error('could not get user session');
	}

	const user = await getUserFromSession();

	if (!user) {
		throw new Error('not authenticated');
	}

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

	const timeDelta = (session.user.auth_time as number) - (reauth.time.getTime() / 1000);

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
