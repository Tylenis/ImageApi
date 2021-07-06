import sharp from 'sharp';
import path from 'path';
import {
    checkIfExists,
    makeThumbFolder,
    thumbsPath,
} from './fileSystemUtility';

/** Resizes and  changes image file format. Returns image path or error message */
const editImage = async (
    filepath: string,
    destfolder: string,
    height: number,
    width: number,
    format = 'jpg'
): Promise<string> => {
    const thumbFolderExist = await checkIfExists(thumbsPath);
    if (!thumbFolderExist) {
        await makeThumbFolder(thumbsPath);
    }
    const filenameWithoutExt = filepath.split('.')[0];
    const basename = path.basename(filenameWithoutExt);
    if (height && width) {
        const outputFilename = `${basename}_${height}_${width}.${format}`;
        const outputFilePath = path.resolve(destfolder, outputFilename);
        const imageExist = await checkIfExists(outputFilePath);
        if (!imageExist) {
            try {
                await sharp(filepath)
                    .resize({ height: height, width: width })
                    .toFile(outputFilePath);
                return outputFilePath;
            } catch (error) {
                return 'Resizing error. Most likely your filename is incorrect.';
            }
        } else {
            return outputFilePath;
        }
    } else if (!height && !width && format !== 'jpg') {
        const outputFilename = `${basename}.${format}`;
        const outputFilePath = path.resolve(destfolder, outputFilename);
        const imageExist = await checkIfExists(outputFilePath);
        if (!imageExist) {
            try {
                await sharp(filepath).toFile(outputFilePath);
                return outputFilePath;
            } catch (error) {
                return 'Image format converting error. Most likely your filename is incorrect.';
            }
        } else {
            return outputFilePath;
        }
    }
    const imageExist = await checkIfExists(filepath);
    if (imageExist) {
        return filepath;
    } else {
        return 'Image does not exist';
    }
};

export { editImage };
