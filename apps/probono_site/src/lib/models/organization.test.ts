/**
 * @jest-environment node
 */
import {Gender} from '@prisma/client';
import {put} from '@vercel/blob';
import {mocked} from 'jest-mock';
import {filetypeextension, filetypemime} from 'magic-bytes.js';
import {pick} from 'lodash';
import {type Organization} from '@prisma/client';
import {
	organizationInitSchema,
	organizationUpdateSchema,
} from '@/lib/schemas/organization.ts';
import {createOrganization, updateOrganization, getUsersDependantOrganizations} from '@/lib/models/organization.ts';
import {prismaMock} from '@/lib/singleton.ts';

jest.mock('@vercel/blob');
jest.mock('magic-bytes.js');

const mockLogo = new Blob(['test'], {type: 'image/png'});
const mockLogoUrl = 'https://someurl.org/logo.png';
const mockExtension = ['png'];
const mockMime = ['image/png'];
const ownerId = 1;
const organizationId = 1;
const mockOrganizationInit = {
	name: 'Organization Name',
	logo: mockLogo,
	foundingYear: 2000,
	isIncorporated: true,
	email: 'test@organization.com',
	webpage: 'http://www.organization.com',
	ageGroups: [
		{ageGroupId: 1, gender: Gender.male},
	],
	beneficiaries: [1, 2, 3],
	activities: [
		{activityId: 1, priority: 1},
	],
	address: {
		id: 2,
		street: 'Street',
		municipalityId: 2,
		postalCode: '12345',
		number: 23,
		location: [23, 32],
	},
};

const mockOrganization = {
	...mockOrganizationInit,
	id: organizationId,
};

beforeEach(async () => {
	// @ts-expect-error other properties not needed for tests.
	(prismaMock.organization.create || prismaMock.organization.update).mockClear().mockResolvedValue(mockOrganization);

	prismaMock.$queryRaw.mockClear();

	(prismaMock.organizationToAgeGroup.deleteMany || prismaMock.organizationToActivity.deleteMany)
		.mockClear();

	// @ts-expect-error other properties not needed for test
	mocked(put).mockClear().mockResolvedValue({url: mockLogoUrl});

	mocked(filetypeextension).mockClear().mockReturnValue(mockExtension);
	mocked(filetypemime).mockClear().mockReturnValue(mockMime);
});

describe('createOrganization function', () => {
	it('completes successfully with valid init data', async () => {
		await createOrganization(ownerId, await organizationInitSchema.parseAsync(mockOrganizationInit));

		// Verify the transaction method calls
		expect(prismaMock.organization.create).toBeCalled();
		expect(prismaMock.$queryRaw).toBeCalled();
		expect(put).toBeCalledWith(
			expect.stringContaining(`organizationLogos/${mockOrganization.id}`),
			mockOrganizationInit.logo,
			{access: 'public'},
		);
	});

	it('throws error on unknown file extension for logo', async () => {
		mocked(filetypeextension).mockReturnValueOnce([]);
		const organization = await organizationInitSchema.parseAsync(mockOrganization);
		await expect(createOrganization(ownerId, {
			...organization,
			logo: mockLogo,
		})).rejects.toThrow('Can\'t find correct extension for file.');
	});
});

describe('updateOrganization function tests', () => {
	const update = {
		logo: mockLogo,
		employeeCountCategoryId: 2,
		volunteerCountCategoryId: 2,
		incomeCategoryId: 2,
		corporationTypeId: 2,
		categoryId: 2,
	};

	it('completes successfully with valid update data', async () => {
		// @ts-expect-error updateOrganization only selects the logoUrl field for this query
		prismaMock.organization.findUniqueOrThrow.mockResolvedValueOnce(pick(mockOrganization, ['logoUrl']));

		await updateOrganization(organizationId, await organizationUpdateSchema.parseAsync(update));

		// Verify the prisma transaction method calls
		expect(prismaMock.organization.update).toBeCalled();
		expect(prismaMock.$queryRaw).not.toBeCalled();
		expect(put).toBeCalledWith(
			expect.stringContaining(`organizationLogos/${organizationId}`),
			update.logo,
			{access: 'public'},
		);
	});

	it('throws error on unknown file extension for logo', async () => {
		(filetypeextension as jest.Mock).mockReturnValueOnce([]);
		const organization = await organizationUpdateSchema.parseAsync(update);
		await expect(updateOrganization(organizationId, {
			...organization,
			logo: mockLogo,
		})).rejects.toThrow('Can\'t find correct extension for file.');
	});
});
jest.mock('@prisma/client');

describe('getOrganizationsWithSoleOwner function', () => {
	it('should return organizations with a sole owner when a valid userID is provided', async () => {
		const userId = 1;
		const expectedResponse = [{
			id: 1,
			_count: {
				owners: 1,
			},
		}];

		// @ts-expect-error typings not needed for test
		prismaMock.organization.findMany.mockResolvedValue(expectedResponse);
		const result = await getUsersDependantOrganizations(userId);
		expect(prismaMock.organization.findMany).toHaveBeenCalledWith({
			where: {
				owners: {
					some: {
						id: userId,
					},
				},
			},
			include: {
				_count: {
					select: {
						owners: true,
					},
				},
			},
		});
		expect(result).toEqual(expectedResponse);
	});
});

jest.mock('@/lib/prisma', () => ({
	organization: {
		findMany: jest.fn(),
	},
}));

describe('getUsersDependantOrganizations()', () => {
	it('should return organization data if it exists with the userId provided', async () => {
		const findManyMock = prismaMock.organization.findMany as jest.Mock;

		// Sample data to be returned by the findMany function
		// @ts-expect-error not needed for test
		const sampleData: Array<Organization & {_count: {owners: number}}> = [{id: 123, _count: {owners: 1}}];

		// Setting what our prisma findMany mock should return
		findManyMock.mockResolvedValue(sampleData);

		const result = await getUsersDependantOrganizations(1);

		expect(findManyMock).toHaveBeenCalledTimes(1);
		expect(findManyMock).toHaveBeenCalledWith({
			where: {
				owners: {
					some: {
						id: 1,
					},
				},
			},
			include: {
				_count: {
					select: {
						owners: true,
					},
				},
			},
		});
		expect(result).toStrictEqual(sampleData);
	});

	// You will need to adjust the test case according to the error handling in the getUsersDependantOrganizations function
	it('should throw an error when database call fails', async () => {
		const findManyMock = prismaMock.organization.findMany as jest.Mock;
		findManyMock.mockRejectedValue(new Error('Database error'));

		// We wrap our async function inside a function for jest to properly handle the promise rejection
		const wrapper = async () => getUsersDependantOrganizations(1);

		await expect(wrapper()).rejects.toThrowError('Database error');
		expect(findManyMock).toHaveBeenCalledTimes(1);
	});
});

