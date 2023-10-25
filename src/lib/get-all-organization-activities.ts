import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

const revalidate = 86_400;

export const getAllOrganizationActivities = cache(async () => prisma.organizationActivity.findMany({
	orderBy: [
		{
			name: 'asc',
		},
	],
}));
