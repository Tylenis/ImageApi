import path from 'path';
import { promises as fs } from 'fs';

import { imageResize } from '../utilities/imageEditor';

describe('Check imageEditor.ts module works as expected', () => {
    const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
    const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');
    const testImagePath = path.resolve(
        assetssPath,
        'assets',
        'images',
        'fjord.jpg'
    );
    const testImageResized = path.resolve(thumbsPath, 'fjord_600_800.jpg');

    beforeAll(async () => {
        try {
            await fs.rm(testImageResized);
        } catch (error) {
            console.log('Test image was not removed!');
        }
    });

    afterAll(async () => {
        try {
            await fs.rm(testImageResized);
        } catch (error) {
            console.log('Test image was not removed!');
        }
    });

    describe('Check imageResize function works as expected', () => {
        it('expect imageResize function with invalid filepath to equal "No image!"', async () => {
            const result = await imageResize('aaaaaa', thumbsPath, 600, 800);
            expect(result).toEqual('No image!');
        });

        it('expect imageResize function creates new thumbn image and return its path', async () => {
            const path = await imageResize(testImagePath, thumbsPath, 600, 800);
            const result = await fs.access(path);
            expect(result).toBe(undefined);
        });

        it('expect imageResize function returns allready existing image path', async () => {
            const statOld = await fs.stat(testImageResized);
            const path = await imageResize(testImagePath, thumbsPath, 600, 800);
            const statNew = await fs.stat(path);
            expect(statOld.birthtime).toEqual(statNew.birthtime);
        });
    });
});
