import {cache} from 'react';
import prisma from '@/lib/prisma.ts';

export const getAllBeneficiaries = cache(async () => prisma.organizationBeneficiary.findMany());
