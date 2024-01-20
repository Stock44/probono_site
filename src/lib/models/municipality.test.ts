import {type Municipality} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {getMunicipalitiesByState} from '@/lib/models/municipality.ts';

const municipalities1: Municipality[] = [
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

const municipalities2: Municipality[] = [
	{
		id: 3,
		stateId: 2,
		name: 'Lorem',
	},
	{
		id: 4,
		stateId: 2,
		name: 'Ipsum',
	},
];

beforeAll(() => {
	// @ts-expect-error PrismaPromise is different from a normal promise object
	prismaMock.municipality.findMany.mockImplementation(async args => {
		console.log('test');
		if (!args?.where) {
			return [];
		}

		if (args.where.stateId === 2) {
			return municipalities2;
		}

		if (args.where.stateId === 1) {
			return municipalities1;
		}
	});
});

test('getMunicipalitiesByState gets correct state data 1', async () => expect(getMunicipalitiesByState(1)).resolves.toEqual(municipalities1));

test('getMunicipalitiesByState gets correct state data 2', async () => expect(getMunicipalitiesByState(2)).resolves.toEqual(municipalities2));
