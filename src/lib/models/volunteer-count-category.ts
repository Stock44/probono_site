import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllVolunteerCountCategories = cache(async () => prisma.volunteerCountCategory.findMany({
	orderBy: {
		minCount: 'asc',
	},
}));
