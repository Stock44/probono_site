import {prismaMock} from '@/lib/singleton.ts';
import {getAllSectors} from '@/lib/models/sector.ts';

test('should fetch all sectors', async () => {
	prismaMock.$queryRaw.mockResolvedValue([
		{
			id: 'test-id',
			name: 'test-name',
			municipalityId: 'test-municipality-id',
			municipalityName: 'test-municipality-name',
			geom: {type: 'Point', coordinates: [0, 0]},
		},
	]);

	const sectors = await getAllSectors();

	// The mock data
	const expected = [
		{
			id: 'test-id',
			name: 'test-name',
			municipalityId: 'test-municipality-id',
			municipalityName: 'test-municipality-name',
			geom: {type: 'Point', coordinates: [0, 0],
			},
		},
	];

	expect(sectors).toEqual(expected);
});
