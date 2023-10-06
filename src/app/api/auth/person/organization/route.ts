import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';
import {getPersonOrganizationByAuthId} from '@/lib/get-person-organization-by-auth-id';

export const GET = withApiAuthRequired(async (request: NextRequest) => {
	const session = await getSession();

	// Session shouldn't be null, as this route is protected
	if (session == null) {
		return new NextResponse('session error', {
			status: 500,
		});
	}

	const organization = await getPersonOrganizationByAuthId(session.user.sub);

	if (organization == null) {
		return new NextResponse('organization for this user not created yet', {
			status: 404,
		});
	}

	return NextResponse.json(organization);
});
