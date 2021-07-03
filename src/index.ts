import express from 'express';

import { dispatchQuery } from './utilities/dispacher';
import { imageResize, changeImageType } from './utilities/imageEditor';
import { thumbsPath, makeImagesFilePath } from './utilities/fileSystemUtility';

const app = express();
const port = 3000;

app.get('/api/images', (req, res) => {
    const supportedFileFormats = ['jpg', 'png', 'webp'];
    const query = req.query;
    const fileName = query.filename as string;
    const height = parseInt(query.height as string);
    const width = parseInt(query.width as string);
    const outputType = (query.format as string) || 'jpg';
    const inputImagePath = makeImagesFilePath(fileName);

    const dispatched = dispatchQuery(fileName, height, width);

    if (!supportedFileFormats.includes(outputType.toLocaleLowerCase())) {
        res.send(
            `<h3>Unsupported image format!</h3><p>API currently works with jpg, png, webp file formats</p>`
        );
        return true;
    }

    if (dispatched == 'thumb') {
        imageResize(inputImagePath, thumbsPath, height, width, outputType)
            .then((result) => {
                res.sendFile(result);
            })
            .catch(() => {
                res.send(`<h3>Requested image not found.</>`);
            });
    } else {
        changeImageType(fileName, outputType)
            .then((result) => {
                res.sendFile(result);
            })
            .catch(() => {
                res.send(`<h3>Requested image not found.</>`);
            });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
