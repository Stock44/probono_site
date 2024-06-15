import {getAllOrganizationCategories} from '@/lib/models/organization-category.ts';
import {prismaMock} from '@/lib/singleton.ts';

describe('getAllOrganizationCategories', () => {
	test('should call findMany with correct parameters', async () => {
		await getAllOrganizationCategories();

		expect(prismaMock.organizationCategory.findMany).toHaveBeenCalledWith({
			orderBy: {
				name: 'asc',
			},
		});
	});

	test('should return a list of organization categories', async () => {
		const categories = [
			{id: 1, name: 'category1'},
			{id: 2, name: 'category2'},
			{id: 3, name: 'category3'},
		];

		prismaMock.organizationCategory.findMany.mockResolvedValue(categories);

		await expect(getAllOrganizationCategories()).resolves.toEqual(
			categories,
		);
	});
});
