import {withApiAuthRequired} from '@auth0/nextjs-auth0';
import {notFound, redirect} from 'next/navigation';
import {NextResponse} from 'next/server';
import {deleteUser, getUserFromSession} from '@/lib/models/user.ts';
import {
	consumeUserReauthentication,
	ReauthenticationExpiredError,
} from '@/lib/models/user-reauthentication.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = withApiAuthRequired(async (request, {params}) => {
	const userId = Number.parseInt(params!.userId as string, 10);

	if (Number.isNaN(userId)) {
		notFound();
	}

	const user = await getUserFromSession();

	if (!user) {
		return new NextResponse(null, {
			status: 401,
		});
	}

	if (user.id !== userId) {
		return new NextResponse(null, {
			status: 403,
		});
	}

	try {
		await consumeUserReauthentication();
	} catch (error) {
		if (error instanceof ReauthenticationExpiredError) {
			redirect('/my/account#expired');
		}

		redirect('/my/account#unknown-error');
	}

	await deleteUser(user.id);

	return redirect('/');
});
