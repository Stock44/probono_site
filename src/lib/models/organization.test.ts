/**
 * @jest-environment node
 */
import {Gender} from '@prisma/client';
import {put} from '@vercel/blob';
import {mocked} from 'jest-mock';
import {filetypeextension, filetypemime} from 'magic-bytes.js';
import {pick} from 'lodash';
import {
	organizationInitSchema,
	organizationUpdateSchema,
} from '@/lib/schemas/organization.ts';
import {createOrganization, updateOrganization} from '@/lib/models/organization.ts';
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
		await expect(createOrganization(ownerId, {...organization, logo: mockLogo})).rejects.toThrow('Can\'t find correct extension for file.');
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
		prismaMock.organization.findFirstOrThrow.mockResolvedValueOnce(pick(mockOrganization, ['logoUrl']));

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
		await expect(updateOrganization(organizationId, {...organization, logo: mockLogo})).rejects.toThrow('Can\'t find correct extension for file.');
	});
});

