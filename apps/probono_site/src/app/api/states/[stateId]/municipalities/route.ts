import {type NextRequest, NextResponse} from 'next/server';
import {getMunicipalitiesByState} from '@/lib/models/municipality.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async (request: NextRequest, {params}: {
	readonly params: {
		readonly stateId: string;
	};
}) => {
	const {stateId} = params;
	const municipalities = await getMunicipalitiesByState(Number.parseInt(stateId, 10));

	return NextResponse.json(municipalities);
};
