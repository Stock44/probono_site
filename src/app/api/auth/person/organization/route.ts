import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';
import {getPersonOrganizationByAuthId} from '@/lib/get-person-organization-by-auth-id.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = withApiAuthRequired(async (request: NextRequest) => {
	const session = (await getSession())!; // Session will never be null

	const organization = await getPersonOrganizationByAuthId(session.user.sub as string);

	if (organization === null) {
		return new NextResponse('organization for this user not created yet', {
			status: 404,
		});
	}

	return NextResponse.json(organization);
});
