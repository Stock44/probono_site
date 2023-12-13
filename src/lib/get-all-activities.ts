import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

const revalidate = 86_400;

export const getAllActivities = cache(async () => prisma.activity.findMany({
	include: {
		organizations: true,
	},
	orderBy:
		{
			name: 'asc',
		},
}));
