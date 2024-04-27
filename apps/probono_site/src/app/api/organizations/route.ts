import {type NextRequest, NextResponse} from 'next/server';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async (request: NextRequest) => {
	const organization = await getApprovedOrganizationInfo();

	return NextResponse.json(organization);
};
