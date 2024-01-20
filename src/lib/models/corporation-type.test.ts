import {type CorporationType} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {getAllCorporationTypes} from '@/lib/models/corporation-type.ts';

test('getAllCorporationTypes should return corporation types', async () => {
	const corporationTypes: CorporationType[] = [
		{
			id: 1,
			name: 'Aorem',
			shortName: 'Ipsum',
		},
		{
			id: 2,
			name: 'Lpra',
			shortName: null,
		},
	];

	prismaMock.corporationType.findMany.mockResolvedValue(corporationTypes);

	await expect(getAllCorporationTypes()).resolves.toEqual(corporationTypes);
});
