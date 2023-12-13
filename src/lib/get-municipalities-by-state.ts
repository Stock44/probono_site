import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export default cache(async (stateId: number) => prisma.municipality.findMany({
	orderBy: {
		name: 'asc',
	},
	where: {
		stateId,
	},
}));
