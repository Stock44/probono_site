import z from 'zod';
import {filetypemime} from 'magic-bytes.js';
import {Set} from 'immutable';

const kb = 1000;
const validImageTypes = Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

export const imageSchema = z.instanceof(Blob).superRefine(async (file, ctx) => {
	if (file.size > 50 * kb) {
		ctx.addIssue({
			code: 'custom',
			path: ['logo'],
			message: 'El archivo no puede pesar más de 50 KB',
		});
	}

	const fileStart = new Uint8Array(await file.slice(0, 100).arrayBuffer());
	const logoFileTypes = Set(filetypemime(fileStart));
	if (logoFileTypes.intersect(validImageTypes).isEmpty()) {
		ctx.addIssue({
			code: 'custom',
			path: ['logo'],
			message: 'El archivo debe estar en formato jpg, jpeg, png, o webp.',
		});
	}
});

export type Image = z.infer<typeof imageSchema>;
