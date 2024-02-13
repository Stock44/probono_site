import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {notFound, redirect} from 'next/navigation';
import {NextResponse} from 'next/server';
import {getUserFromSession} from '@/lib/models/user.ts';

export const GET = withApiAuthRequired(async (request, {params}) => {
	const userId = Number.parseInt(params!.userId, 10);

	if (Number.isNaN(userId)) {
		notFound();
	}

	const session = await getSession();

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

	console.log('deleting user?');

	return redirect('/');
});
