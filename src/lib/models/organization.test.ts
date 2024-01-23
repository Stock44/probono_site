/**
 * @jest-environment node
 */
import {fileTypeFromBlob} from 'file-type';
import {put} from '@vercel/blob';
import {mocked} from 'jest-mock';
import {createOrganization} from '@/lib/models/organization.ts';
import {type OrganizationInit} from '@/lib/schemas/organization.ts';
import {prismaMock} from '@/lib/singleton.ts';

jest.mock('file-type');
jest.mock('@vercel/blob');

const mockedFileTypeFromBlob = mocked(fileTypeFromBlob);
const mockedPut = mocked(put);

describe('createOrganization function', () => {
	const validMockOrganizationInit: OrganizationInit = {
		address: null,
		logo:
      new File(['test'], 'filename.png', {type: 'image/png'}),
		name: 'Test Organization',
		employeeCountCategoryId: 1,
		volunteerCountCategoryId: 2,
		foundingYear: 2023,
		isIncorporated: false,
		incomeCategoryId: 3,
		corporationTypeId: 4,
		ageGroups: [
			{ageGroupId: 1, gender: 'female'},
		],
		activities: [
			{activityId: 1, priority: 1},
		],
		beneficiaries: [1, 2],
	};
	const invalidMockOrganizationInit: OrganizationInit = {
		...validMockOrganizationInit,
		logo: new File(['test'], 'filename.png', {type: 'image/invalid'}),
	};

	test('creates an organization with valid logo', async () => {
		const validOwnerId = 1;

		const fileTypeResult = {
			ext: 'png' as const,
			mime: 'image/png' as const,
		};

		prismaMock.$transaction.mockResolvedValue({});
		mockedFileTypeFromBlob.mockResolvedValue(fileTypeResult);
		mockedPut.mockResolvedValue({
			contentDisposition: 'sampleDisposition', contentType: 'image/png', pathname: '/directory/filename.png',
			url: 'https://example.com/directory/filename.png',
		});

		await expect(createOrganization(validOwnerId, validMockOrganizationInit)).resolves.toStrictEqual({});
	});

	test('throws error if the logo is not in a supported format', async () => {
		const validOwnerId = 1;

		const fileTypeResult = {
			ext: 'gz' as const,
			mime: 'image/tiff' as const,
		};

		prismaMock.$transaction.mockResolvedValue({});
		mockedFileTypeFromBlob.mockResolvedValue(fileTypeResult);

		await expect(createOrganization(validOwnerId, invalidMockOrganizationInit)).rejects.toThrow('Logo image is not in a supported image format');
	});
});
