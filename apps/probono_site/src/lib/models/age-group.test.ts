import {type AgeGroup} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {getAllAgeGroups} from '@/lib/models/age-group.ts';

test('getAllAgeGroups should return age groups', async () => {
	const ageGroups: AgeGroup[] = [
		{
			id: 0,
			minAge: 2,
			maxAge: 4,
		},
		{
			id: 1,
			minAge: 4,
			maxAge: null,
		},
	];
	prismaMock.ageGroup.findMany.mockResolvedValue(ageGroups);

	await expect(getAllAgeGroups()).resolves.toEqual(ageGroups);
});
