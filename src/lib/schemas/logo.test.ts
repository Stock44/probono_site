/**
 * @jest-environment node
 */

/*
import {ZodError} from 'zod';
import {logoSchema} from '@/lib/schemas/logo.ts';
import {fileTypeFromBlob} from 'file-type';

jest.mock('@vercel/blob');


describe('logo update schema', () => {
    const validLogo1 = new File(['logo content'], 'logo.png', {type: 'image/png'});
    const validLogo2 = new File(['logo content'], 'logo.jpg', {type:'image/jpg'})
    const validLogo3 = new File(['logo content'], 'logo.jpeg', {type:'image/jpeg'})
    const validLogo4 = new File(['logo content'], 'logo.webp', {type:'image/webp'})

    const invalidLogo1 = new File(['logo content'], 'logo.tiff', {type:'image/tiff'})
    const invalidLogo2 = new File(['logo content'], 'logo.vnd.adobe.photoshop', {type:'image/vnd.adobe.photoshop'})
    const invalidLogo3 = new File(['logo content'], 'logo.bmp', {type:'image/bmp'})

    
    //Tests que pasan, con cada formato de tamaño indicado
	test('valid image with png format and 25 kB size should pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect(() => logoSchema.parse(validLogo1)).not.toThrow();
	});
    test('valid image with jpg format and 46 kB size should pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect(() => logoSchema.parse(validLogo2)).not.toThrow();
    });
    test('valid image with jpeg format and 47 kB size should pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect(() => logoSchema.parse(validLogo3)).not.toThrow();
    });
    test('valid image with webp format and 5 kB size should pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect(() => logoSchema.parse(validLogo4)).not.toThrow();
    });


    //Tests que fallan, con formatos no apoyados
    test('invalid image with tiff format should not pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect (() => logoSchema.parse(invalidLogo1)).toThrow(ZodError);
    })
    test('invalid image with vnd.adobe.photoshop format should not pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect (() => logoSchema.parse(invalidLogo2)).toThrow(ZodError);
    })
    test('invalid image with bmp format should not pass.', async () => {
        (fileTypeFromBlob as jest.Mock).mockResolvedValue(undefined);
        expect (() => logoSchema.parse(invalidLogo3)).toThrow(ZodError);
    })

    //Tests que fallan por archivos muy grandes
    
});

*/
