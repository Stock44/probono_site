import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export default cache(async () => prisma.employeeCountCategory.findMany({
	orderBy: {
		minCount: 'asc',
	},
}));
