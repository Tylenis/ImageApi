import { NextFunction, Request, Response } from 'express';

const invalidSizeParamsMsg = `<h3>Invalid height/width parameters</h3><p>Both height and width parameters are required.</p>`;
const invalidFormatParamMsg = `<h3>Invalid format parameter</h3><p>Currently works with jpg, png, webp.</p>`;

const validateSizeParams = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const query = req.query;
    const height = query.height as string;
    const width = query.width as string;
    const hasHeightProperty = Object.prototype.hasOwnProperty.call(
        query,
        'height'
    );
    const hasWidthProperty = Object.prototype.hasOwnProperty.call(
        query,
        'width'
    );
    const heightInt = parseInt(height);
    const widthInt = parseInt(width);
    if (heightInt && widthInt && !isNaN(heightInt) && !isNaN(widthInt)) {
        next();
    } else if (!hasHeightProperty && !hasWidthProperty) {
        next();
    } else {
        res.send(invalidSizeParamsMsg);
    }
};

const validateOutputFormat = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const query = req.query;
    const supportedFileFormats = ['jpg', 'png', 'webp'];
    const format = query.format as string;
    const hasFormatProperty = Object.prototype.hasOwnProperty.call(
        query,
        'format'
    );
    if (
        hasFormatProperty &&
        supportedFileFormats.includes(format.toLocaleLowerCase())
    ) {
        next();
    } else if (!hasFormatProperty) {
        next();
    } else {
        res.send(invalidFormatParamMsg);
    }
};

export { validateSizeParams, validateOutputFormat };
