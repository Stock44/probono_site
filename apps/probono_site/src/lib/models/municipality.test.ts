import {type Municipality} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {getMunicipalitiesByState} from '@/lib/models/municipality.ts';

const municipalities: Municipality[] = [
	{
		id: 1,
		stateId: 1,
		name: 'Lorem',
	},
	{
		id: 2,
		stateId: 1,
		name: 'Ipsum',
	},
];

test('getMunicipalitiesByState gets state data', async () => {
	prismaMock.municipality.findMany.mockResolvedValue(municipalities);
	await expect(getMunicipalitiesByState(1)).resolves.toEqual(municipalities);
});
