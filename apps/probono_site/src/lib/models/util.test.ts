// Importing the required function

// Writing tests for connectId function
import {connectId} from '@/lib/models/util.ts';

test('returns object with id in connect key for non-null and non-undefined id', () => {
	const id = 5;
	const expectedObject = {connect: {id: 5}};
	expect(connectId(id)).toEqual(expectedObject);
});

test('returns undefined for null id', () => {
	const id = null;
	expect(connectId(id)).toBe(undefined);
});

test('returns undefined for undefined id', () => {
	const id = undefined;
	expect(connectId(id)).toBe(undefined);
});
