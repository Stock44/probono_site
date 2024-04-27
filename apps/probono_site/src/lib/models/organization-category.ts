import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllOrganizationCategories = cache(async () => prisma.organizationCategory.findMany({
	orderBy: {
		name: 'asc',
	},
}));
