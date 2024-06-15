import {NextResponse} from 'next/server';
import {getAllSectors} from '@/lib/models/sector.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async () => {
	const sectors = await getAllSectors();
	return NextResponse.json(sectors);
};
