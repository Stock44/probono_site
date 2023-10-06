import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id';

export const GET = withApiAuthRequired(async (request: NextRequest) => {
	const session = await getSession();

	// Session shouldn't be null, as this route is protected
	if (session == null) {
		return new NextResponse('session error', {
			status: 500,
		});
	}

	const person = await getPersonByAuthId(session.user.sub);

	if (person == null) {
		return new NextResponse('person for this user not created yet', {
			status: 404,
		});
	}

	return NextResponse.json(person);
});
