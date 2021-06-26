import sharp from 'sharp';
import path from 'path';
import {
    checkIfExists,
    makeThumbFolder,
    thumbsPath,
} from './fileSystemUtility';

const imageResize = async (
    filepath: string,
    destfolder: string,
    height: number,
    width: number
): Promise<string> => {
    const filename =
        path.basename(filepath, '.jpg') + '_' + height + '_' + width + '.jpg';
    const fulltPath = path.resolve(destfolder, filename);

    try {
        await makeThumbFolder(thumbsPath);
        const exists = await checkIfExists(fulltPath);
        if (exists) {
            return fulltPath;
        } else {
            await sharp(filepath)
                .resize({ height: height, width: width })
                .toFile(fulltPath);
            return fulltPath;
        }
    } catch (error) {
        return 'No image!';
    }
};

export { imageResize };
