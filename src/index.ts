import express from 'express';

import {
    validateSizeParams,
    validateOutputFormat,
} from './middleware/validators';
import { editImage } from './utilities/imageEditor';
import { thumbsPath, makeImagesFilePath } from './utilities/fileSystemUtility';

const app = express();
const port = 3000;

app.get(
    '/api/images',
    validateSizeParams,
    validateOutputFormat,
    async (req, res): Promise<void> => {
        const query = req.query;
        const fileName = query.filename as string;
        const height = parseInt(query.height as string);
        const width = parseInt(query.width as string);
        const outputType = (query.format as string) || 'jpg';
        const inputImagePath = makeImagesFilePath(fileName);

        const responseString = await editImage(
            inputImagePath,
            thumbsPath,
            height,
            width,
            outputType
        );
        try {
            res.sendFile(responseString);
        } catch (error) {
            res.send(`<h3>Error!</h3><p>${responseString}</p>`);
        }
    }
);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
