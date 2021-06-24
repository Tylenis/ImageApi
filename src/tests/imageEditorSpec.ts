import path from 'path';
import { promises as fs } from 'fs';

import { imageResize, checkImageExists } from '../utilities/imageEditor';

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
            console.log('Image "fjord_600_800.jpg" removed before tests');
        } catch (error) {
            console.log('Image  not removed');
        }
    });

    afterAll(async () => {
        try {
            await fs.rm(testImageResized);
            console.log('Image "fjord_600_800.jpg" removed after tests \n');
        } catch (error) {
            console.log('Image not removed');
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

    describe('Check checkImageExists function works as expected', () => {
        it('expect checkImageExists function returns true if image exists', async () => {
            const checkIfExist = await checkImageExists(testImageResized);
            expect(checkIfExist).toBeTrue();
        });

        it('expect checkImageExists function returns false if image exists or path is invalid', async () => {
            const checkIfExist = await checkImageExists('random string');
            expect(checkIfExist).toBeFalse();
        });
    });
});
