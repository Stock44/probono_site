import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getMunicipalitiesByState = cache(async (stateId: number) =>
	prisma.municipality.findMany({
		orderBy: {
			name: 'asc',
		},
		where: {
			stateId,
		},
	}),
);
