import z from 'zod';

export function emptyStringToNull(arg: unknown) {
	if (typeof arg !== 'string') {
		return arg;
	}

	if (arg.trim() === '') {
		return null;
	}

	return arg;
}

export const phoneSchema = z
	.string()
	.regex(/\+?[()+\d ]+(x\d+)?/g)
	.transform(value => value.replaceAll(/[^+\dx]/g, ''));
