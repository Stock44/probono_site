import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';
import {getUserByAuthId} from '@/lib/user.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = withApiAuthRequired(async (request: NextRequest) => {
	const session = (await getSession())!; // Session shouldn't be null, as this route is protected

	const person = await getUserByAuthId(session.user.sub as string);

	if (person === null) {
		return new NextResponse('user for this user not created yet', {
			status: 404,
		});
	}

	return NextResponse.json(person);
});
