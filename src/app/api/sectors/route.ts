import {type NextRequest, NextResponse} from 'next/server';
import {getAllSectors} from '@/lib/models/sector';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async (request: NextRequest) => {
	const sectors = await getAllSectors();
	return NextResponse.json(sectors);
};
