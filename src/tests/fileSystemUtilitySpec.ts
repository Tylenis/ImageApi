import path from 'path';
import { promises as fs } from 'fs';

import { editImage } from '../utilities/imageEditor';
import { checkIfExists } from '../utilities/fileSystemUtility';

describe('Check checkImageExists function works as expected.', (): void => {
    const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
    const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');
    const testImagePath = path.resolve(
        assetssPath,
        'assets',
        'images',
        'fjord.jpg'
    );
    const testImageResized = path.resolve(thumbsPath, 'fjord_600_800.jpg');

    beforeAll(async (): Promise<void> => {
        await editImage(testImagePath, thumbsPath, 600, 800);
    });

    it('expect checkImageExists function  to return true if image exist.', async (): Promise<void> => {
        const checkIfExist = await checkIfExists(testImageResized);
        expect(checkIfExist).toBeTrue();
    });

    it('expect checkImageExists function to return false if image does not exist.', async (): Promise<void> => {
        const checkIfExist = await checkIfExists('random string');
        expect(checkIfExist).toBeFalse();
    });

    afterAll(async (): Promise<void> => {
        try {
            await fs.rm(testImageResized);
        } catch (error) {
            console.log(' Test image was not removed');
        }
    });
});
