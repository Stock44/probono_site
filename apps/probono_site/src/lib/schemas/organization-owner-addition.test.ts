import {z} from 'zod';
import {organizationOwnerAdditionSchema} from '@/lib/schemas/organization-owner-addition.ts'; // Make sure zod library is imported

describe('Organization Owner Addition Schema', () => {
	test('should pass if the email is valid', () => {
		const testEmail = {email: 'test@example.com'};
		expect(() => organizationOwnerAdditionSchema.parse(testEmail)).not.toThrow();
	});

	test('should fail if the email is not valid', () => {
		const testEmail = {email: 'wrongemail'};
		expect(() => organizationOwnerAdditionSchema.parse(testEmail)).toThrowError('Ingresa un correo válido');
	});

	test('should fail if the email missing', () => {
		const testEmail = {};
		const error = '\n  {\n    "email": "Required"\n  }\n';
		expect(() => organizationOwnerAdditionSchema.parse(testEmail)).toThrowError(new z.ZodError([{code: 'invalid_type',
			expected: 'string',
			received: 'undefined',
			path: ['email'],
			message: 'Required'}]));
	});
});
