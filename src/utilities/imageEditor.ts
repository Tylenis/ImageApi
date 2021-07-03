import sharp from 'sharp';
import path from 'path';
import {
    checkIfExists,
    makeThumbFolder,
    makeThubnFilePath,
    makeImagesFilePath,
    thumbsPath,
} from './fileSystemUtility';

/** Resizes and  changes image file format. Returns image */
const imageResize = async (
    filepath: string,
    destfolder: string,
    height: number,
    width: number,
    outputtype = 'jpg'
): Promise<string> => {
    const outpuFileType = '.' + outputtype;
    const filenameWithoutExt = filepath.split('.')[0];
    const outputFilename =
        path.basename(filenameWithoutExt) +
        '_' +
        height +
        '_' +
        width +
        outpuFileType;
    const outputFilePath = path.resolve(destfolder, outputFilename);

    try {
        await makeThumbFolder(thumbsPath);
        const exists = await checkIfExists(outputFilePath);
        if (exists) {
            return outputFilePath;
        } else {
            await sharp(filepath)
                .resize({ height: height, width: width })
                .toFile(outputFilePath);
            return outputFilePath;
        }
    } catch (error) {
        return 'No image!';
    }
};

/** Changes image file type. Currently changes to png, webp */
const changeImageType = async (
    image: string,
    outtype: string
): Promise<string> => {
    const inputFilePath = makeImagesFilePath(image);
    const exist = await checkIfExists(inputFilePath);
    if (outtype == 'jpg' && exist) {
        return inputFilePath;
    }
    const outpuFileType = '.' + outtype;
    const outputFilePath = makeThubnFilePath(image) + outpuFileType;
    const exists = await checkIfExists(outputFilePath);
    if (exists) {
        return outputFilePath;
    } else {
        await makeThumbFolder(thumbsPath);
        await sharp(inputFilePath).toFile(outputFilePath);
        return outputFilePath;
    }
};

export { imageResize, changeImageType };
