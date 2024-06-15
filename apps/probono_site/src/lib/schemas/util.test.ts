import z, {ZodError} from 'zod';
import {
	boolean,
	emptyStringToNull,
	json,
	phoneSchema,
	urlHostnameRefinement,
} from '@/lib/schemas/util.ts';

describe('emptyStringToNull', () => {
	test('empty string should be converted to null', () => {
		expect(emptyStringToNull('')).toEqual(null);
	});

	test('string full of whitespace should be converted to null', () => {
		expect(emptyStringToNull('        ')).toEqual(null);
	});

	test('non-empty string should be left as-is 1', () => {
		expect(emptyStringToNull('asdf')).toEqual('asdf');
	});
	test('non-empty string should be left as-is 2', () => {
		expect(emptyStringToNull('    asdf ')).toEqual('    asdf ');
	});

	test('non-string values should be left as-is 1', () => {
		expect(emptyStringToNull(2)).toEqual(2);
	});
	test('non-string values should be left as-is 2', () => {
		expect(emptyStringToNull(null)).toEqual(null);
	});
	test('non-string values should be left as-is 3', () => {
		expect(emptyStringToNull(false)).toEqual(false);
	});
});

describe('phone schema', () => {
	test('parsing valid phone number with int code should pass 1', () => {
		expect(() => phoneSchema.parse('+1 206 555 0100')).not.toThrow();
	});
	test('parsing valid phone number with int code should pass 2', () => {
		expect(() => phoneSchema.parse('+52 206 555 0100')).not.toThrow();
	});
	test('parsing valid phone number with postfix should pass', () => {
		expect(() => phoneSchema.parse('206 555 0100x213')).not.toThrow();
	});
	test('parsing valid phone number should pass', () => {
		expect(() => phoneSchema.parse('81 8000 8000')).not.toThrow();
	});
	test('parsing invalid phone number should throw', () => {
		expect(() => phoneSchema.parse('asdfas')).toThrow(ZodError);
	});
	test('parsing wrong type should throw', () => {
		expect(() => phoneSchema.parse(false)).toThrow(ZodError);
	});
	test('parsing should remove whitespace 1', () => {
		expect(phoneSchema.parse('+1 206 555 0100')).toEqual('+12065550100');
	});
	test('parsing should remove whitespace 1', () => {
		expect(phoneSchema.parse('555 0100 x 213')).toEqual('5550100x213');
	});
});

describe('url hostname refinement', () => {
	const schema = z.string().transform(urlHostnameRefinement('example'));
	test('refinement of same hostname should pass', () => {
		expect(() => schema.parse('example.com')).not.toThrow();
	});
	test('refinement of different hostname should throw', () => {
		expect(() => schema.parse('whoa.com')).toThrow(ZodError);
	});
	test('refinement of same hostname should return path 1', () => {
		expect(schema.parse('example.com/asdf')).toEqual('asdf');
	});
	test('refinement of same hostname should return path 2', () => {
		expect(schema.parse('example.com/asdf/asdf/asdf')).toEqual(
			'asdf/asdf/asdf',
		);
	});
});

describe('boolean schema', () => {
	test('parsing empty string should return false', () => {
		expect(boolean.parse('')).toEqual(false);
	});
	test('parsing falsy value should return false 1', () => {
		expect(boolean.parse(0)).toEqual(false);
	});
	test('parsing falsy value should return false 2', () => {
		expect(boolean.parse(false)).toEqual(false);
	});
	test('parsing truthy value should return true 1', () => {
		expect(boolean.parse('true')).toEqual(true);
	});
	test('parsing truthy value should return true 2', () => {
		expect(boolean.parse(42)).toEqual(true);
	});
});

describe('json schema', () => {
	const numberArrayJsonSchema = json(z.array(z.number()));
	const booleanJsonSchema = json(z.boolean());

	test('parsing correct serialized value of schema should pass 1', () => {
		expect(() => numberArrayJsonSchema.parse('[2, 3, 4.2]')).not.toThrow();
	});
	test('parsing correct value of schema should pass 1', () => {
		expect(() => numberArrayJsonSchema.parse([2, 3, 4.2])).not.toThrow();
	});
	test('parsing correct value of schema should deserialize into corresponding value', () => {
		expect(numberArrayJsonSchema.parse('[2, 3, 4.2]')).toEqual([2, 3, 4.2]);
	});
	test('parsing invalid serialized value of schema should throw 1', () => {
		expect(() => numberArrayJsonSchema.parse('4.2]')).toThrow(ZodError);
	});
	test('parsing incorrect value of schema should throw 1', () => {
		expect(() => numberArrayJsonSchema.parse(42)).toThrow(ZodError);
	});
	test('parsing correct serialized value of schema should pass 2', () => {
		expect(() => booleanJsonSchema.parse('false')).not.toThrow();
	});
	test('parsing correct value of schema should pass 2', () => {
		expect(() => booleanJsonSchema.parse('true')).not.toThrow();
	});
	test('parsing invalid serialized value of schema should throw 2', () => {
		expect(() => booleanJsonSchema.parse('tr')).toThrow(ZodError);
	});
	test('parsing incorrect value of schema should throw 2', () => {
		expect(() => booleanJsonSchema.parse(12)).toThrow(ZodError);
	});
});
