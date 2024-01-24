/**
 * @jest-environment node
 */
import {fileTypeFromBlob} from 'file-type';
import {put} from '@vercel/blob';
import {CluniStatus, DonationAuthStatus} from '@prisma/client';
import {prismaMock} from '@/lib/singleton.ts';
import {createOrganization, updateOrganization} from '@/lib/models/organization.ts';
import {type OrganizationInit, type OrganizationUpdate} from '@/lib/schemas/organization.ts';

jest.mock('file-type');
jest.mock('@vercel/blob');

describe('createOrganization', () => {
	const logoExample = new File(['logo content'], 'logo.png', {type: 'image/png'});
	const init: OrganizationInit = {
		categoryId: 1,
		cluniStatus: CluniStatus.no,
		corporationTypeId: 2,
		donationAuthStatus: DonationAuthStatus.authorized,
		email: 'email@example.com',
		employeeCountCategoryId: 3,
		facebook: 'Facebook Example Page',
		foundingYear: 2000,
		hasInvestmentAgreement: true,
		incomeCategoryId: 4,
		incorporationYear: 2005,
		instagram: 'Instagram Handle',
		isIncorporated: true,
		legalConcept: 'Legal Concept Example',
		linkedIn: 'LinkedIn Example Account',
		logo: logoExample,
		logoUrl: 'http://example.com/logo.png',
		ods: 12,
		phone: '+1234567890',
		rfc: 'rfc example string',
		tiktok: 'TikTok Handle',
		twitter: 'Twitter Handle',
		volunteerCountCategoryId: 5,
		wantsToIncorporate: true,
		webpage: 'http://example.com',
		youtube: 'YouTube Channel Link',
		name: 'test org',
	};

	test('should return an error if logo image is not in a supported format', async () => {
		const ownerId = 1;

		// Example File object for the logo

		(fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
		await expect(createOrganization(ownerId, init)).rejects.toThrowError('Logo image is not in a supported image format');
	});

	test('should successfully create organization', async () => {
		const ownerId = 1;
		(fileTypeFromBlob as jest.Mock).mockResolvedValue({mime: 'image/jpeg', ext: 'jpg'});
		(put as jest.Mock).mockResolvedValue({url: 'url_to_logo'});

		prismaMock.$transaction.mockResolvedValueOnce({
			id: 1,
		});

		await expect(createOrganization(ownerId, init)).resolves.toEqual({id: 1});
	});
});

describe('updateOrganization', () => {
	it('should return an error if logo image is not in a supported format', async () => {
		const invalidLogo = new File(['logo content'], 'logo.tiff', {type: 'image/tiff'});
		const organizationId = 1;
		const update: OrganizationUpdate = {
			logo: invalidLogo,
			name: 'test org',
		};

		prismaMock.organization.findFirstOrThrow.mockResolvedValue({
			id: 2,
			categoryId: 1,
			approved: false,
			addressId: null,
			workplaceTypeId: null,
			cluniStatus: CluniStatus.no,
			corporationTypeId: 2,
			donationAuthStatus: DonationAuthStatus.authorized,
			email: 'email@example.com',
			employeeCountCategoryId: 3,
			facebook: 'Facebook Example Page',
			foundingYear: 2000,
			hasInvestmentAgreement: true,
			incomeCategoryId: 4,
			incorporationYear: 2005,
			instagram: 'Instagram Handle',
			isIncorporated: true,
			legalConcept: 'Legal Concept Example',
			linkedIn: 'LinkedIn Example Account',
			logoUrl: 'http://example.com/logo.png',
			ods: 12,
			phone: '+1234567890',
			rfc: 'rfc example string',
			tiktok: 'TikTok Handle',
			twitter: 'Twitter Handle',
			volunteerCountCategoryId: 5,
			wantsToIncorporate: true,
			webpage: 'http://example.com',
			youtube: 'YouTube Channel Link',
			name: 'test org',
		});

		(fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);

		await expect(updateOrganization(organizationId, update)).rejects.toThrowError('Logo image is not in a supported image format');
	});

	it('should successfully update organization', async () => {
		const organizationId = 1;
		const logo = new File(['logo content'], 'logo.png', {type: 'image/png'});
		const update = {
			logo,
			name: 'test org',
		};
		(fileTypeFromBlob as jest.Mock).mockResolvedValue({mime: 'image/jpeg', ext: 'jpg'});
		(put as jest.Mock).mockResolvedValue({url: 'url_to_logo'});

		prismaMock.organization.findFirstOrThrow.mockResolvedValue({
			id: 2,
			categoryId: 1,
			approved: false,
			addressId: null,
			workplaceTypeId: null,
			cluniStatus: CluniStatus.no,
			corporationTypeId: 2,
			donationAuthStatus: DonationAuthStatus.authorized,
			email: 'email@example.com',
			employeeCountCategoryId: 3,
			facebook: 'Facebook Example Page',
			foundingYear: 2000,
			hasInvestmentAgreement: true,
			incomeCategoryId: 4,
			incorporationYear: 2005,
			instagram: 'Instagram Handle',
			isIncorporated: true,
			legalConcept: 'Legal Concept Example',
			linkedIn: 'LinkedIn Example Account',
			logoUrl: 'http://example.com/logo.png',
			ods: 12,
			phone: '+1234567890',
			rfc: 'rfc example string',
			tiktok: 'TikTok Handle',
			twitter: 'Twitter Handle',
			volunteerCountCategoryId: 5,
			wantsToIncorporate: true,
			webpage: 'http://example.com',
			youtube: 'YouTube Channel Link',
			name: 'test org',
		});
		(fileTypeFromBlob as jest.Mock).mockResolvedValue({mime: 'image/jpeg', ext: 'jpg'});
		(put as jest.Mock).mockResolvedValue({url: 'url_to_logo'});

		await expect(updateOrganization(organizationId, update)).resolves.toBe(undefined);
	});
});
//prismamock

// json en variable

// prismamock.org.findunique.calledwith()...

/*expect(prismaMock.organization.findUnique).toHaveBeenCalledWith({
    where: {
        id: 2,
    },
});
prismaMock.organization.findUnique.mockResolvedValue({
    name: 'asdf',
    id: 2,
    ods: 15,
    // 8/16 campos nulos
});

await expect(miFuncion()).resolves.toEqual(50);
ktw-phmf-dzv

*/