import path from 'path';
import { promises as fs } from 'fs';

import { editImage } from '../utilities/imageEditor';

describe('Check imageEditor.ts module works as expected.', (): void => {
    const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
    const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');
    const testImagePath = path.resolve(
        assetssPath,
        'assets',
        'images',
        'fjord.jpg'
    );
    const testImageResizedJPG = path.resolve(thumbsPath, 'fjord_600_800.jpg');
    const testImageResizedPNG = path.resolve(thumbsPath, 'fjord_600_800.png');

    describe('Check editImage function works as expected.', (): void => {
        it('expect editImage function  to return path of unmodified image.', async (): Promise<void> => {
            const path = await editImage(testImagePath, thumbsPath, NaN, NaN);
            expect(path).toBe(testImagePath);
        });

        it('expect editImage function  to resize image and return its path.', async (): Promise<void> => {
            const path = await editImage(testImagePath, thumbsPath, 600, 800);
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });

        it('expect editImage function  to resize, convert image to "png" format and return its path.', async (): Promise<void> => {
            const path = await editImage(
                testImagePath,
                thumbsPath,
                600,
                800,
                'png'
            );
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });

        it('expect editImage function to return allready existing image path without resizing.', async (): Promise<void> => {
            const pathOld = await editImage(
                testImagePath,
                thumbsPath,
                600,
                800
            );
            const statOld = await fs.stat(pathOld);
            const pathNew = await editImage(
                testImagePath,
                thumbsPath,
                600,
                800
            );
            const statNew = await fs.stat(pathNew);
            expect(statOld.birthtime).toEqual(statNew.birthtime);
        });

        it('expect editImage function with  size parameters and invalid filename to return "Resizing error. Most likely your filename is incorrect."', async (): Promise<void> => {
            const result = await editImage('aaaaaa', thumbsPath, 600, 800);
            expect(result).toEqual(
                'Resizing error. Most likely your filename is incorrect.'
            );
        });
        it('expect editImage function with  with format parameter  and invalid filename to return "Image format converting error. Most likely your filename is incorrect."', async (): Promise<void> => {
            const result = await editImage(
                'aaaaaa',
                thumbsPath,
                NaN,
                NaN,
                'png'
            );
            expect(result).toEqual(
                'Image format converting error. Most likely your filename is incorrect.'
            );
        });
        it('expect editImage function with  without format, size parameters  and with invalid filename to return "Image does not exist"', async (): Promise<void> => {
            const result = await editImage('aaaaaa', thumbsPath, NaN, NaN);
            expect(result).toEqual('Image does not exist');
        });

        afterAll(async (): Promise<void> => {
            try {
                await fs.rm(testImageResizedJPG);
            } catch (error) {
                console.log('Resized JPG image not found.');
            }
            try {
                await fs.rm(testImageResizedPNG);
            } catch (error) {
                console.log('Resized PNG image not found.');
            }
        });
    });
});
