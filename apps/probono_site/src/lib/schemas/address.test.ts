import {ZodError} from 'zod';
import {omit} from 'lodash';
import {addressInitSchema} from '@/lib/schemas/address.ts';

describe('address schema', () => {
	const validAddress = {
		street: 'Abc',
		postalCode: '123',
		number: 312,
		location: [21.32, 213.5],
		municipalityId: 2,
	};
	test('parsing valid address should pass', () => {
		expect(() => addressInitSchema.parse(validAddress)).not.toThrow();
	});
	test('parsing incomplete address should throw 1', () => {
		expect(() => addressInitSchema.parse(omit(validAddress, ['street', 'postalCode']))).toThrow(ZodError);
	});
	test('parsing incomplete address should throw 2', () => {
		expect(() => addressInitSchema.parse(omit(validAddress, ['location', 'number']))).toThrow(ZodError);
	});
	test('parsing incomplete address should throw 3', () => {
		expect(() => addressInitSchema.parse(omit(validAddress, ['postalCode', 'municipalityId']))).toThrow(ZodError);
	});

	test('parsing invalid address should throw', () => {
		expect(() => addressInitSchema.parse({
			street: 2,
			postalCode: false,
			number: 'abc',
			location: 2,
			municipalityId: 'pop',
		})).toThrow(ZodError);
	});
});
