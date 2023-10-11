import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

const revalidate = 86_400;

export const getAllOrganizationActivitiesByCategory = cache(async () => prisma.organizationActivityCategory.findMany({
	include: {
		activities: {
			orderBy: [
				{
					name: 'asc',
				},
			],
		},
	},
	orderBy: [
		{
			name: 'asc',
		},
	],
}));
