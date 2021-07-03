import path from 'path';
import { promises as fs } from 'fs';

import { imageResize, changeImageType } from '../utilities/imageEditor';

describe('Check imageEditor.ts module works as expected.', () => {
    const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
    const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');
    const testImagePath = path.resolve(
        assetssPath,
        'assets',
        'images',
        'fjord.jpg'
    );
    const testImage = 'fjord';
    const testImageResizedJPG = path.resolve(thumbsPath, 'fjord_600_800.jpg');
    const testImageResizedPNG = path.resolve(thumbsPath, 'fjord_600_800.png');
    const testImageConverted = path.resolve(thumbsPath, 'fjord_600_800.png');

    beforeAll(async () => {
        try {
            await fs.rm(testImageResizedJPG);
        } catch (error) {
            return false;
        }
    });

    describe('Check imageResize function works as expected.', () => {
        it('expect imageResize function  to resize image and return its path.', async () => {
            const path = await imageResize(testImagePath, thumbsPath, 600, 800);
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });

        it('expect imageResize function  to resize, convert image to "png" format and return its path.', async () => {
            const path = await imageResize(
                testImagePath,
                thumbsPath,
                600,
                800,
                'png'
            );
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });

        it('expect imageResize function to return allready existing image path without resizing.', async () => {
            const statOld = await fs.stat(testImageResizedJPG);
            const path = await imageResize(testImagePath, thumbsPath, 600, 800);
            const statNew = await fs.stat(path);
            expect(statOld.birthtime).toEqual(statNew.birthtime);
        });

        it('expect imageResize function with invalid filepath to return "No image!"', async () => {
            const result = await imageResize('aaaaaa', thumbsPath, 600, 800);
            expect(result).toEqual('No image!');
        });
    });
    describe('Check changeImageType function works as expected.', () => {
        it('expect changeImageType  function to return image path if the image allready exist and output format is "jpg".', async () => {
            const path = await changeImageType(testImage, 'jpg');
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });
        it('expect changeImageType function  to convert to "png" format and return image path.', async () => {
            const path = await changeImageType(testImage, 'png');
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });
        it('expect changeImageType function  to return allready existing "png" image path without converting.', async () => {
            const pathOld = await changeImageType(testImage, 'png');
            const statOld = await fs.stat(pathOld);
            const pathNew = await changeImageType(testImage, 'png');
            const statNew = await fs.stat(pathNew);
            expect(statOld.birthtime).toEqual(statNew.birthtime);
        });
    });
    afterAll(async () => {
        try {
            await fs.rm(testImageResizedJPG);
        } catch (error) {
            console.log('Resized JPG image does not exist');
        }
        try {
            await fs.rm(testImageResizedPNG);
        } catch (error) {
            console.log('Resized PNG image does not exist');
        }
        try {
            await fs.rm(testImageConverted);
        } catch (error) {
            console.log('PNG image does not exist');
        }
    });
});
