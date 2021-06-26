import path from 'path';
import { promises as fs } from 'fs';

import { imageResize } from '../utilities/imageEditor';
import { checkIfExists } from '../utilities/fileSystemUtility';

describe('Check checkImageExists function works as expected', () => {
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
        await imageResize(testImagePath, thumbsPath, 600, 800);
    });

    afterAll(async () => {
        try {
            await fs.rm(testImageResized);
        } catch (error) {
            console.log(' Test image was not removed');
        }
    });

    it('expect checkImageExists function returns true if image exists', async () => {
        const checkIfExist = await checkIfExists(testImageResized);
        expect(checkIfExist).toBeTrue();
    });

    it('expect checkImageExists function returns false if image exists or path is invalid', async () => {
        const checkIfExist = await checkIfExists('random string');
        expect(checkIfExist).toBeFalse();
    });
});
