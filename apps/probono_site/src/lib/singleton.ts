import {type PrismaClient} from '@prisma/client';
import {mockDeep, mockReset, type DeepMockProxy} from 'jest-mock-extended';
import prisma from '@/lib/prisma.ts';

jest.mock('./prisma.ts', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
	prismaMock.$transaction.mockImplementation(async func => {
		if (typeof func === 'function') {
			return func(prismaMock);
		}

		return Promise.all(func);
	});
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
