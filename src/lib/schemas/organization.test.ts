import {CluniStatus, DonationAuthStatus, Gender} from '@prisma/client';
import {organizationInitSchema, organizationUpdateSchema} from '@/lib/schemas/organization.ts';

describe('organization init schema', () => {
	test('parsing valid organization init should pass', () => {
		const validOrganization = {
			logo: new File([], 'test'),
			name: 'Contoso',
			foundingYear: 2018,
			email: 'example@example.com',
			webpage: 'https://www.example.com',
			phone: '+1 206 555 0100',
			hasInvestmentAgreement: false,
			logoUrl: 'https://www.example.com',
			ods: 4,
			facebook: 'https://www.facebook.com/facebook/?_rdc=1&_rdr',
			instagram: 'https://www.instagram.com/instagram/',
			twitter: 'https://twitter.com/elonmusk',
			tiktok: 'https://www.tiktok.com/@tiktok',
			youtube: 'https://www.youtube.com/youtube',
			linkedin: 'https://www.linkedin.com/company/linkedin',
			wantsToIncorporate: false,
			isIncorporated: false,
			rfc: 'VECJ880326',
			donationAuthStatus: DonationAuthStatus.authorized,
			cluniStatus: CluniStatus.no,
			employeeCountCategoryId: 2,
			volunteerCountCategoryId: 2,
			legalConcept: 'Contoso Inc.',
			corporationTypeId: 2,
			incorporationYear: 2012,
			categoryId: 4,
			incomeCategoryId: 4,
			ageGroups: [{
				ageGroupId: 4,
				gender: Gender.male,
			}],
			beneficiaries: [4],
			activities: [{
				activityId: 4,
				priority: 8,
			}],

			address: null, // Address tested on its own test suite
		};

		expect(() => organizationInitSchema.parse(validOrganization)).not.toThrow();
	});
	test('parsing invalid organization init should throw', () => {
		const invalidOrganization = {
			logo: 'asdf',
			name: 2,
			foundingYear: 2018.123,
			email: 'example',
			webpage: '.com',
			phone: 'asdf',
			logoUrl: 1892,
			ods: 4.123,
			facebook: 'https://www.asdf.com/facebook/?_rdc=1&_rdr',
			instagram: 'https://www.lijlfd.com/instagram/',
			twitter: 'https://hjdfjklsh.com/elonmusk',
			tiktok: 'https://www.adsjfljkas.com/@tiktok',
			youtube: 'https://www.aksjdfhk.com/youtube',
			linkedIn: 'https://www.wawa.com/company/linkedin',
			rfc: 213,
			donationAuthStatus: 'aaa',
			cluniStatus: 'asdfasdf',
			employeeCountCategoryId: 'asdf',
			volunteerCountCategoryId: 'asdf',
			legalConcept: 4891,
			corporationTypeId: 2.18,
			incorporationYear: 2012.128,
			categoryId: 'aaa',
			incomeCategoryId: 'asdas',
			ageGroups: [{
				ptest: 'false',
				unknown: 'a',
			}],
			beneficiaries: [4, 4.12],
			activities: [{
				activityId: 4,
				priority: 8,
			}, {test: false}],
		};

		const result = organizationInitSchema.safeParse(invalidOrganization);

		expect(result.success).toEqual(false);

		if (result.success) {
			return;
		}

		expect(result.error.issues.length).toEqual(27);
	});
});

describe('organization update schema', () => {
	test('parsing valid partial organization update should pass', () => {
		const validOrganization = {
			name: 'Contoso',
			foundingYear: 2018,
			webpage: 'https://www.example.com',
			phone: '+1 206 555 0100',
			facebook: 'https://www.facebook.com/facebook/?_rdc=1&_rdr',
			instagram: 'https://www.instagram.com/instagram/',
			tiktok: 'https://www.tiktok.com/@tiktok',
			youtube: 'https://www.youtube.com/youtube',
			wantsToIncorporate: false,
			rfc: 'VECJ880326',
			cluniStatus: CluniStatus.no,
			legalConcept: 'Contoso Inc.',
			corporationTypeId: 2,
			incorporationYear: 2012,
			categoryId: 4,
			incomeCategoryId: 4,
			ageGroups: [{
				ageGroupId: 4,
				gender: Gender.male,
			}],
			beneficiaries: [4],
		};

		expect(() => organizationUpdateSchema.parse(validOrganization)).not.toThrow();
	});
	test('parsing valid organization update should pass', () => {
		const validOrganization = {
			logo: new File([], 'test'),
			name: 'Contoso',
			foundingYear: 2018,
			email: 'example@example.com',
			webpage: 'https://www.example.com',
			phone: '+1 206 555 0100',
			hasInvestmentAgreement: false,
			logoUrl: 'https://www.example.com',
			ods: 4,
			facebook: 'https://www.facebook.com/facebook/?_rdc=1&_rdr',
			instagram: 'https://www.instagram.com/instagram/',
			twitter: 'https://twitter.com/elonmusk',
			tiktok: 'https://www.tiktok.com/@tiktok',
			youtube: 'https://www.youtube.com/youtube',
			linkedin: 'https://www.linkedin.com/company/linkedin',
			wantsToIncorporate: false,
			isIncorporated: false,
			rfc: 'VECJ880326',
			donationAuthStatus: DonationAuthStatus.authorized,
			cluniStatus: CluniStatus.no,
			employeeCountCategoryId: 2,
			volunteerCountCategoryId: 2,
			legalConcept: 'Contoso Inc.',
			corporationTypeId: 2,
			incorporationYear: 2012,
			categoryId: 4,
			incomeCategoryId: 4,
			ageGroups: [{
				ageGroupId: 4,
				gender: Gender.male,
			}],
			beneficiaries: [4],
			activities: [{
				activityId: 4,
				priority: 8,
			}],

			address: null, // Address tested on its own test suite
		};

		expect(() => organizationUpdateSchema.parse(validOrganization)).not.toThrow();
	});
	test('parsing invalid organization update should throw', () => {
		const invalidOrganization = {
			logo: 'asdf',
			name: 2,
			foundingYear: 2018.123,
			email: 'example',
			webpage: '.com',
			phone: 'asdf',
			logoUrl: 1892,
			ods: 4.123,
			facebook: 'https://www.asdf.com/facebook/?_rdc=1&_rdr',
			instagram: 'https://www.lijlfd.com/instagram/',
			twitter: 'https://hjdfjklsh.com/elonmusk',
			tiktok: 'https://www.adsjfljkas.com/@tiktok',
			youtube: 'https://www.aksjdfhk.com/youtube',
			linkedIn: 'https://www.wawa.com/company/linkedin',
			rfc: 213,
			donationAuthStatus: 'aaa',
			cluniStatus: 'asdfasdf',
			employeeCountCategoryId: 'asdf',
			volunteerCountCategoryId: 'asdf',
			legalConcept: 4891,
			corporationTypeId: 2.18,
			incorporationYear: 2012.128,
			categoryId: 'aaa',
			incomeCategoryId: 'asdas',
			ageGroups: [{
				ptest: 'false',
				unknown: 'a',
			}],
			beneficiaries: [4, 4.12],
			activities: [{
				activityId: 4,
				priority: 8,
			}, {test: false}],
		};

		const result = organizationUpdateSchema.safeParse(invalidOrganization);

		expect(result.success).toEqual(false);

		if (result.success) {
			return;
		}

		expect(result.error.issues.length).toEqual(27);
	});
});
