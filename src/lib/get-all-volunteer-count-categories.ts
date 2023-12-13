import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export default cache(async () => prisma.volunteerCountCategory.findMany({
	orderBy: {
		minCount: 'asc',
	},
}));
