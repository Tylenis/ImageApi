import path from 'path';

const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
const imagesPath = path.resolve(assetssPath, 'assets', 'images');
const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');

/**Constructs image path. Returns path */
const makeImagesFilePath = (filename: string): string => {
    const filePath = path.resolve(imagesPath, `${filename}.jpg`);
    return filePath;
};
/**Constructs  thumb image path. Returns path */
const makeThubnFilePath = (
    filename: string,
    height: number,
    width: number
): string => {
    const fullFileName = `${filename}_${height}_${width}`;
    const filePath = path.resolve(thumbsPath, fullFileName);
    return filePath;
};

export {
    assetssPath,
    imagesPath,
    thumbsPath,
    makeImagesFilePath,
    makeThubnFilePath,
};
