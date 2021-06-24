import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';

/**Checks if the given image exists.*/
const checkImageExists = async (filename: string): Promise<boolean> => {
    try {
        await fsPromises.access(filename);
        return true;
    } catch {
        return false;
    }
};
/**Resizes given image. Returns resized image path. If the image allready exists, doesn't resize, returns image path.*/
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
        const exists = await checkImageExists(fulltPath);
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

export { imageResize, checkImageExists };
