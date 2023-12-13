import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllAgeGroups = cache(async () => prisma.ageGroup.findMany());
