import {NextResponse} from 'next/server';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async () => {
	const organization = await getApprovedOrganizationInfo();

	return NextResponse.json(organization);
};
