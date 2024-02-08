import z from 'zod';
import {filetypemime} from 'magic-bytes.js';
import {Set} from 'immutable';

const kb = 1000;
const validImageTypes = Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

/**
 * Validates if a file is a valid image based on its size and file type.
 *
 * @param {number} maxSize - The maximum allowed file size in kilobytes (KB).
 * @returns A Zod schema that performs the image validation.
 */
export default function imageSchema(maxSize: number) {
	return z.instanceof(Blob).superRefine(async (blob, ctx) => {
		if (blob.size > maxSize * kb) {
			ctx.addIssue({
				code: 'custom',
				path: ['logo'],
				message: 'El archivo no puede pesar más de 50 KB',
			});
		}

		const fileStart = new Uint8Array(await blob.slice(0, 100).arrayBuffer());
		const logoFileTypes = Set(filetypemime(fileStart));

		if (logoFileTypes.intersect(validImageTypes).isEmpty()) {
			ctx.addIssue({
				code: 'custom',
				path: ['logo'],
				message: 'El archivo debe estar en formato jpg, jpeg, png, o webp.',
			});
		}
	});
}

export type Image = z.infer<ReturnType<typeof imageSchema>>;
