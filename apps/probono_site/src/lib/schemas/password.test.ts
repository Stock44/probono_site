import {omit} from 'lodash';
import {ZodError} from 'zod';
import {passwordUpdateSchema} from '@/lib/schemas/password.ts';

describe('password update schema', () => {
	const validPassword = {
		currentPassword: 'abc',
		password: 'xyz',
	};
	test('parsing valid password update should pass', () => {
		expect(() => passwordUpdateSchema.parse(validPassword)).not.toThrow();
	});
	test('parsing incomplete password update should throw 1', () => {
		expect(() => passwordUpdateSchema.parse(omit(validPassword, ['currentPassword']))).toThrow(ZodError);
	});
	test('parsing incomplete password update should throw 2', () => {
		expect(() => passwordUpdateSchema.parse(omit(validPassword, ['password']))).toThrow(ZodError);
	});
	test('parsing empty object should throw', () => {
		expect(() => passwordUpdateSchema.parse({})).toThrow(ZodError);
	});
});
