import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllStates = cache(async () => prisma.state.findMany({
	orderBy: {
		name: 'asc',
	},
}));
