import z from 'zod';
import {fileTypeFromBlob} from 'file-type';
import {del, put} from '@vercel/blob';

const kb = 1000;
const validImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

export const logoSchema = z.instanceof(File).superRefine((file, ctx) => {
        if (file.size > 50 * kb) {
            ctx.addIssue({
                code: 'custom',
                path: ['logo'],
                message: 'El archivo no puede pesar más de 50 KB',
            });
        }

        const logoFileType = fileTypeFromBlob(file);
        if (logoFileType === undefined || !validImageTypes.has(`${logoFileType}`)) {
            ctx.addIssue({
                code: 'custom',
                path: ['logo'],
                message: 'El archivo debe estar en formato jpg, jpeg, png, o webp.',
            });       
        }
    });

export type LogoUpdate = z.infer<typeof logoSchema>;
