import {type EmployeeCountCategory} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {getAllEmployeeCountCategories} from '@/lib/models/employee-count-category.ts';

test('getAllEmployeeCountCategories should return corporation types', async () => {
	const employeeCountCategories: EmployeeCountCategory[] = [
		{
			id: 1,
			minCount: 0,
			maxCount: 10,
		},
		{
			id: 2,
			minCount: 11,
			maxCount: 200,
		},
	];

	prismaMock.employeeCountCategory.findMany.mockResolvedValue(
		employeeCountCategories,
	);

	await expect(getAllEmployeeCountCategories()).resolves.toEqual(
		employeeCountCategories,
	);
});
