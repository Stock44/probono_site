import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllCorporationTypes = cache(async () => prisma.corporationType.findMany());
