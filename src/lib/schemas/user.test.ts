import {ZodError} from 'zod';
import {userDeleteSchema, userInitSchema, userUpdateSchema} from '@/lib/schemas/user.ts';

describe('user init schema', () => {
	test('parsing a complete user init object should pass', () => {
		const validUser = {
			givenName: 'John',
			familyName: 'Doe',
			contactEmail: 'example@example.com',
			contactPhone: '+1 206 555 0100',
		};

		expect(() => userInitSchema.parse(validUser)).not.toThrow();
	});

	test('parsing a user init object without contact data should pass', () => {
		const validUser = {
			givenName: 'John',
			familyName: 'Doe',
		};

		expect(() => userInitSchema.parse(validUser)).not.toThrow();
	});

	test('parsing an empty object should throw', () => {
		const emptyObject = {};

		expect(() => userInitSchema.parse(emptyObject)).toThrow(ZodError);
	});

	test('parsing a valid user init object with invalid phone should throw', () => {
		const invalidUser = {
			givenName: 'John',
			familyName: 'Doe',
			contactPhone: 'asdf',
		};

		expect(() => userInitSchema.parse(invalidUser)).toThrow(ZodError);
	});

	test('parsing a valid user init object with invalid email should throw', () => {
		const invalidUser = {
			givenName: 'John',
			familyName: 'Doe',
			contactEmail: 'Lorem ipsum',
		};

		expect(() => userInitSchema.parse(invalidUser)).toThrow(ZodError);
	});

	test('parsing a user with only contact data should throw', () => {
		const invalidUser = {
			contactEmail: 'example@example.com',
			contactPhone: '+1 206 555 0100',
		};

		expect(() => userInitSchema.parse(invalidUser)).toThrow(ZodError);
	});

	test('parsing user with wrong types should throw', () => {
		const invalidUser = {
			givenName: true,
			familyName: -234,
			contactEmail: Symbol('Lorem'),
			contactPhone: 32,
		};

		expect(() => userInitSchema.parse(invalidUser)).toThrow(ZodError);
	});
});

describe('user update schema', () => {
	test('parsing an email-only update object should pass', () => {
		const validUpdate = {
			email: 'example@example.com',
		};

		expect(() => userUpdateSchema.parse(validUpdate)).not.toThrow();
	});

	test('parsing an update object with no contact data should pass', () => {
		const validUpdate = {
			givenName: 'Jóhn',
			lastName: 'Doeñ',
			email: 'example@example.com',
		};

		expect(() => userUpdateSchema.parse(validUpdate)).not.toThrow();
	});

	test('parsing a complete update object should pass', () => {
		const validUpdate = {
			givenName: 'John',
			familyName: 'Doe',
			contactEmail: 'example@example.com',
			contactPhone: '+1 206 555 0100',
			email: 'example@example.com',
		};

		expect(() => userUpdateSchema.parse(validUpdate)).not.toThrow();
	});

	test('parsing a complete update object with invalid contact data update should throw', () => {
		const invalidUpdate = {
			givenName: 'John',
			familyName: 'Doe',
			contactEmail: 'example.com',
			contactPhone: 'asdf',
			email: 'aaaaa',
		};

		expect(() => userUpdateSchema.parse(invalidUpdate)).toThrow(ZodError);
	});

	test('parsing an update with wrong types should throw', () => {
		const invalidUpdate = {
			givenName: true,
			familyName: -234,
			contactEmail: Symbol('Lorem'),
			contactPhone: 32,
			email: false,
		};

		expect(() => userUpdateSchema.parse(invalidUpdate)).toThrow(ZodError);
	});

	test('parsing an empty update should pass', () => {
		expect(() => userUpdateSchema.parse({})).not.toThrow();
	});
});

describe ('user delete schema', () => {
	const validPassword = {
		password: 'xyz',
	};
	test('parsing valid password should pass', () => {
		expect(() => userDeleteSchema.parse(validPassword)).not.toThrow();
	});

	test('parsing empty object should throw', () => {
		expect(() => userDeleteSchema.parse({})).toThrow(ZodError);
	});
});