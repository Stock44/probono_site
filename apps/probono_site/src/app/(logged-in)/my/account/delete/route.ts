import {withApiAuthRequired} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {NextResponse} from 'next/server';
import {deleteUser, getUserFromSession} from '@/lib/models/user.ts';
import {
	consumeUserReauthentication,
	NoReauthenticationRequestedError,
	ReauthenticationExpiredError,
} from '@/lib/models/user-reauthentication.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = withApiAuthRequired(async request => {
	const user = await getUserFromSession(request, new NextResponse());

	if (!user) {
		// This shouldn't ever happen, if it does other parts of the application are mishandling users
		redirect('/my');
	}

	try {
		await consumeUserReauthentication();
	} catch (error) {
		if (error instanceof ReauthenticationExpiredError) {
			return redirect('/my/account#expired');
		}

		if (error instanceof NoReauthenticationRequestedError) {
			return redirect('/my/account#no-reauth');
		}

		console.error(error);

		return redirect('/my/account#unknown-error');
	}

	try {
		await deleteUser(user.id);
	} catch (error) {
		console.error(error);
		return redirect('/my/account#unknown-error');
	}

	return redirect('/');
});
