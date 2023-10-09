import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const revalidate = 1800;

export const getPersonByAuthId = cache(async (authId: string) => prisma.person.findFirst({
	where: {
		authId,
	},
}));