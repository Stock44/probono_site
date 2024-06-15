import {Gender} from '@prisma/client';
import {ZodError} from 'zod';
import {organizationInitSchema} from '@/lib/schemas/organization.ts';

test('should validate a valid organization object', () => {
	const mockOrganization = {
		name: 'Organization Name',
		foundingYear: 2000,
		isIncorporated: true,
		email: 'test@organization.com',
		webpage: 'http://www.organization.com',
		ageGroups: JSON.stringify([{ageGroupId: 1, gender: Gender.male}]),
		beneficiaries: JSON.stringify([1, 2, 3]),
		activities: JSON.stringify([{activityId: 1, priority: 1}]),
		address: JSON.stringify({
			id: 2,
			street: 'Street',
			municipalityId: 2,
			postalCode: '12345',
			number: 23,
			location: [23, 32],
		}),
	};

	expect(() => organizationInitSchema.parse(mockOrganization)).not.toThrow();
});

test('should fail validation for an invalid organization object', () => {
	const mockOrganization = {
		name: 123, // Invalid type
		foundingYear: 2000,
		isIncorporated: true,
		email: 'test@organization.com',
		webpage: 'http://www.organization.com',
		ageGroups: JSON.stringify([{ageGroupId: 1, gender: Gender.male}]),
		beneficiaries: JSON.stringify([1, 2, 3]),
		activities: JSON.stringify([{activityId: 1, priority: 1}]),
		address: JSON.stringify({
			city: 'City',
			country: 'Country',
			state: 'State',
			street: 'Street',
			zipcode: '12345',
		}),
	};

	const result = () => organizationInitSchema.parse(mockOrganization);

	expect(result).toThrow();
});

test('should throw on incorrect type', () => {
	const invalidOrganization = {
		name: 1234,
		foundingYear: 2000,
		isIncorporated: true,
	};

	expect(() => organizationInitSchema.parse(invalidOrganization)).toThrow(
		ZodError,
	);
});

test('should throw on invalid email', () => {
	const invalidOrganization = {
		name: 'Organization Name',
		foundingYear: 2000,
		isIncorporated: true,
		email: 'notAnEmail',
	};

	expect(() => organizationInitSchema.parse(invalidOrganization)).toThrow(
		ZodError,
	);
});

test('should throw on invalid URL', () => {
	const invalidOrganization = {
		name: 'Organization Name',
		foundingYear: 2000,
		isIncorporated: true,
		email: 'test@organization.com',
		webpage: 'notAUrl',
	};

	expect(() => organizationInitSchema.parse(invalidOrganization)).toThrow(
		ZodError,
	);
});

test('should throw on invalid JSON', () => {
	const invalidOrganization = {
		name: 'Organization Name',
		foundingYear: 2000,
		isIncorporated: true,
		email: 'test@organization.com',
		webpage: 'http://www.organization.com',
		ageGroups: 'Not a JSON', // Invalid JSON
	};

	expect(() => organizationInitSchema.parse(invalidOrganization)).toThrow(
		ZodError,
	);
});

test('should throw on incorrect Age Group JSON', () => {
	const invalidOrganization = {
		name: 'Organization Name',
		foundingYear: 2000,
		isIncorporated: true,
		email: 'test@organization.com',
		webpage: 'http://www.organization.com',
		ageGroups: '[{"ageGroupId": "should be number", "gender": 1}]',
	};

	expect(() => organizationInitSchema.parse(invalidOrganization)).toThrow(
		ZodError,
	);
});
