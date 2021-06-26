import express from 'express';

import { validateQuery } from './utilities/validators';
import { imageResize } from './utilities/imageEditor';
import { thumbsPath, makeImagesFilePath } from './utilities/fileSystemUtility';

const app = express();
const port = 3000;

app.get('/api/images', (req, res) => {
    const query = req.query;
    const fileName = query.filename as string;
    const height = parseInt(query.height as string);
    const width = parseInt(query.width as string);
    const fullImagePath = makeImagesFilePath(fileName);

    const validated = validateQuery(fileName, height, width);

    try {
        switch (validated) {
            case 'images': {
                res.sendFile(fullImagePath, (err): void => {
                    if (err) {
                        res.send(`<h3>Requested image not found.</>`);
                    }
                });
                break;
            }
            case 'thumb': {
                imageResize(fullImagePath, thumbsPath, height, width)
                    .then((result) => {
                        res.sendFile(result);
                    })
                    .catch(() => {
                        res.send(`<h3>Requested image not found.</>`);
                    });
                break;
            }
            default: {
                res.send(
                    `<h3>Check you url! Looks like it's missing filename or height/width parameters.</>`
                );
                break;
            }
        }
    } catch (error) {
        res.send('<h3>Server error</h3>');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
