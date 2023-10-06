import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = withApiAuthRequired(async (request: NextRequest) => {
	const session = (await getSession())!; // Session shouldn't be null, as this route is protected

	const person = await getPersonByAuthId(session.user.sub as string);

	if (person === null) {
		return new NextResponse('person for this user not created yet', {
			status: 404,
		});
	}

	return NextResponse.json(person);
});
