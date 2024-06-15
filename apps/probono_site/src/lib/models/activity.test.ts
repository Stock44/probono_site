import {type Activity} from '@prisma/client';
import {getAllActivities} from '@/lib/models/activity.ts';
import {prismaMock} from '@/lib/singleton.ts';

test('getAllActivities should return activities', async () => {
	const activities: Activity[] = [
		{
			id: 2,
			name: 'Lorem Ipsum',
			categoryId: 4,
		},
		{
			id: 3,
			name: 'Lorem Ipsum',
			categoryId: 6,
		},
	];
	prismaMock.activity.findMany.mockResolvedValue(activities);

	await expect(getAllActivities()).resolves.toEqual(activities);
});
