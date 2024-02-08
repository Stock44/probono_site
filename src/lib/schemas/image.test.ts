import {type SafeParseError, z} from 'zod';
import imageSchema from '@/lib/schemas/image.ts';

// Mock Blob class
// @ts-expect-error Not all properties needed for tests
global.Blob = class {
	size: number;
	parts: [ArrayBuffer];

	constructor(parts: [ArrayBuffer]) {
		this.size = parts[0].byteLength;
		this.parts = parts;
	}

	arrayBuffer() {
		return this.parts[0];
	}

	slice() {
		return this;
	}
};

const array = new ArrayBuffer(60 * 1000);
const bigBlob = new Blob([array]); // File of 60 KB

test('should throw for big file size', async () => {
	const schema = imageSchema(50); // MaxSize is set to 50 KB

	const result = await schema.safeParseAsync(bigBlob) as SafeParseError<Blob>;

	expect(result.success).toBe(false);

	expect(result.error.issues).toContainEqual({
		code: 'custom',
		path: ['logo'],
		message: 'El archivo no puede pesar más de 50 KB',
	});
});

test('should throw for incompatible image type', async () => {
	const schema = imageSchema(70); // MaxSize is set to 70 KB
	const result = await schema.safeParseAsync(bigBlob) as SafeParseError<Blob>;

	expect(result.success).toBe(false);

	expect(result.error.issues).toContainEqual({
		code: 'custom',
		path: ['logo'],
		message: 'El archivo debe estar en formato jpg, jpeg, png, o webp.',
	});
});

it('should validate properly sized and typed image', async () => {
	// ArrayBuffer for a 1x1 white pixel PNG
	const whitePixelPngStartBytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 1, 115, 122, 122, 244, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0, 11, 19, 0, 0, 11, 19, 1, 0, 154, 156, 24, 0, 0, 0, 7, 116, 73, 77, 69, 7, 228, 2]).buffer;
	const compatibleBlob = new Blob([whitePixelPngStartBytes]); // File of 30 KB, PNG bytes

	const schema = imageSchema(50); // MaxSize is set to 50 KB
	await expect(schema.safeParseAsync(compatibleBlob)).resolves.toMatchObject({
		success: true,
		data: compatibleBlob,
	});
});

it('should throw error on non-Blob inputs', async () => {
	const schema = imageSchema(50); // MaxSize is set to 50 KB

	await expect(schema.parseAsync('non-blob')).rejects.toThrow(z.ZodError);
});
