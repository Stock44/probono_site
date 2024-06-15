import {prismaMock} from '@/lib/singleton.ts';
import {getAllStates} from '@/lib/models/state.ts';

test('should call prisma.state.findMany with correct params', async () => {
	await getAllStates();

	expect(prismaMock.state.findMany).toHaveBeenCalledWith({
		orderBy: {
			name: 'asc',
		},
	});
});

test('should throw an error if prisma.state.findMany fails', async () => {
	prismaMock.state.findMany.mockRejectedValueOnce(
		new Error('Database Error'),
	);

	await expect(getAllStates()).rejects.toThrow('Database Error');
});
