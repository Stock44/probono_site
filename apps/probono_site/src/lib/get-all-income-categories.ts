import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export default cache(async () => prisma.incomeCategory.findMany({
	orderBy: {
		minIncome: 'asc',
	},
}));
