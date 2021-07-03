import path from 'path';
import { promises as fsPromises } from 'fs';

const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
const imagesPath = path.resolve(assetssPath, 'assets', 'images');
const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');

/**Constructs image path. Returns path */
const makeImagesFilePath = (filename: string, ext = 'jpg'): string => {
    const filePath = path.resolve(imagesPath, `${filename}.${ext}`);
    return filePath;
};
/**Constructs  thumb image path. Returns path */
const makeThubnFilePath = (
    filename: string,
    height?: number,
    width?: number
): string => {
    let fullFileName: string;
    let filePath: string;
    if (height && width) {
        fullFileName = `${filename}_${height}_${width}`;
        filePath = path.resolve(thumbsPath, fullFileName);
    } else {
        filePath = path.resolve(thumbsPath, filename);
    }

    return filePath;
};

/**Checks if the given image/folder exists.*/
const checkIfExists = async (path: string): Promise<boolean> => {
    try {
        await fsPromises.access(path);
        return true;
    } catch {
        return false;
    }
};

/**Creates thumb folder. */
const makeThumbFolder = async (path: string): Promise<boolean> => {
    const exist = await checkIfExists(path);
    if (exist) {
        return true;
    } else {
        fsPromises.mkdir(path).catch((err) => {
            console.log(err);
            return false;
        });
        return true;
    }
};

export {
    assetssPath,
    imagesPath,
    thumbsPath,
    makeImagesFilePath,
    makeThubnFilePath,
    checkIfExists,
    makeThumbFolder,
};
