import {type VolunteerCountCategory} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {getAllVolunteerCountCategories} from '@/lib/models/volunteer-count-category.ts';

jest.mock('@/lib/prisma.ts', () => ({
	volunteerCountCategory: {
		findMany: jest.fn(),
	},
}));

describe('getAllVolunteerCountCategories', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('calls prisma.volunteerCountCategory.findMany with correct sorting', async () => {
		const dummyData: VolunteerCountCategory[] = []; // Replace it with some dummy data
		prismaMock.volunteerCountCategory.findMany.mockResolvedValue(dummyData);

		const result = await getAllVolunteerCountCategories();

		expect(prismaMock.volunteerCountCategory.findMany).toBeCalledWith({
			orderBy: {
				minCount: 'asc',
			},
		});
		expect(result).toEqual(dummyData);
	});
});
