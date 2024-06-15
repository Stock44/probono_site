import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllEmployeeCountCategories = cache(async () =>
	prisma.employeeCountCategory.findMany({
		orderBy: {
			minCount: 'asc',
		},
	}),
);
