import path from 'path';
import { promises as fs } from 'fs';
import supertest from 'supertest';

import app from '../index';

const request = supertest(app);

describe('Test "/api/images" endpoint.', () => {
    const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
    const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');
    const testImageResizedJPG = path.resolve(thumbsPath, 'fjord_600_800.jpg');
    const testImageResizedPNG = path.resolve(thumbsPath, 'fjord_600_800.png');
    const testImageResizedWebp = path.resolve(thumbsPath, 'fjord_600_800.webp');
    const testImageOrigPNG = path.resolve(thumbsPath, 'fjord.png');
    const testImageOrigWebP = path.resolve(thumbsPath, 'fjord.webp');

    describe('Test endpoint with "filename" parameter.', () => {
        it('expect "/api/images?filename=fjord" to respond with status code 200.', async () => {
            const response = await request.get('/api/images?filename=fjord');
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord" to respond with "image/jpeg".', async () => {
            const response = await request.get('/api/images?filename=fjord');
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=aaaa" (invalid "filename" parameter) to respond with status code 200.', async () => {
            const response = await request.get('/api/images?filename=aaaa');
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=aaaa" (invalid "filename" parameter) to respond with "text/html".', async () => {
            const response = await request.get('/api/images?filename=aaaa');
            expect(response.type).toBe('text/html');
        });
        it('expect "/api/images?filename=aaaa" (invalid "filename" parameter) to respond  with "<h3>Requested image not found.</h3>".', async () => {
            const response = await request.get('/api/images?filename=aaaa');
            expect(response.text).toBe('<h3>Requested image not found.</>');
        });
    });

    describe('Test endpoint with "filename", "height", "width" parameters.', () => {
        it('expect "/api/images?filename=fjord&width=800&height=600" to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800&height=600" to respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600'
            );
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=aaaa&width=800&height=600" (invalid "filename" parameter) to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&width=800&height=600'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=aaaa&width=800&height=600" (invalid "filename" parameter) to respond with "text/html".', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&width=800&height=600'
            );
            expect(response.type).toBe('text/html');
        });
        it('expect "/api/images?filename=aaaa&width=800&height=600" (invalid "filename" parameter) to respond with "<h3>Requested image not found.</h3>".', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&width=800&height=600'
            );
            expect(response.text).toBe('<h3>Requested image not found.</>');
        });
        it('expect "/api/images?filename=fjord&width=800" (missing "height" parameter) to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800" (missing "height" parameter) to respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800'
            );
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=fjord&height=600" (missing "width" parameter) to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&height=600'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&height=600" (missing "width" parameter) to respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&height=600'
            );
            expect(response.type).toBe('image/jpeg');
        });

        afterAll(async () => {
            await fs.rm(testImageResizedJPG);
        });
    });

    describe('Test endpoint with "filename", "height", "width", "format" parameters.', () => {
        beforeEach(async () => {
            try {
                await fs.rm(testImageResizedJPG);
            } catch (error) {
                return false;
            }
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=jpg" respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=jpg'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=jpg" respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=jpg'
            );
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=png" respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=png'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=png" respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=png'
            );
            expect(response.type).toBe('image/png');
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=webp" respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=webp'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=webp" respond with "image/webp".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=webp'
            );
            expect(response.type).toBe('image/webp');
        });
        it('expect "/api/images?filename=aaaa&width=800&height=600&format=jpg" (invalid "filename" parameter) respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&width=800&height=600&format=jpg'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=aaaa&width=800&height=600&format=jpg" (invalid "filename" parameter) respond with "text/html".', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&width=800&height=600&format=jpg'
            );
            expect(response.type).toBe('text/html');
        });
        it('expect "/api/images?filename=aaaa&width=800&height=600&format=jpg" (invalid "filename" parameter) respond with "<h3>Requested image not found.</h3>".', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&width=800&height=600&format=jpg'
            );
            expect(response.text).toBe('<h3>Requested image not found.</>');
        });
        it('expect "/api/images?filename=fjord&height=600&format=jpg" (missing "width" parameter) respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&height=600&format=jpg'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&height=600&format=jpg" (missing "width" parameter) respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&height=600&format=jpg'
            );
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=fjord&width=800&format=jpg" (missing "height" parameter) respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&format=jpg'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800&format=jpg" (missing "height" parameter) respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&format=jpg'
            );
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=aaa" (unsupported image format) respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=aaa'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=aaa" (unsupported image format) respond with "text/html".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=aaa'
            );
            expect(response.type).toBe('text/html');
        });
        it('expect "/api/images?filename=fjord&width=800&height=600&format=aaa" (unsupported image format) respond with "<h3>Unsupported image format!</h3><p>API currently works with jpg, png, webp file formats</p>".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=800&height=600&format=aaa'
            );
            expect(response.text).toBe(
                '<h3>Unsupported image format!</h3><p>API currently works with jpg, png, webp file formats</p>'
            );
        });
    });

    describe('Test endpoint with "filename" and "format" parameters.', () => {
        it('expect "/api/images?filename=fjord&format=png" to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=png'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&format=png" to respond with "image/png".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=png'
            );
            expect(response.type).toBe('image/png');
        });

        it('expect "/api/images?filename=fjord&format=webp" to respond with status code 200', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=webp'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&format=webp" to respond with "image/webp".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=webp'
            );
            expect(response.type).toBe('image/webp');
        });

        it('expect "/api/images?filename=fjord&format=jpg" to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=jpg'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&format=jpg" to respond with "image/jpeg".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=jpg'
            );
            expect(response.type).toBe('image/jpeg');
        });
        it('expect "/api/images?filename=aaaa&format=jpg" (invalid "filename" parameter) to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&format=jpg'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=aaaa&format=jpg" (invalid "filename" parameter) to respond with "text/html".', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&format=jpg'
            );
            expect(response.type).toBe('text/html');
        });
        it('expect "/api/images?filename=aaaa&format=jpg" (invalid "filename" parameter) to respond with "<h3>Requested image not found.</h3>".', async () => {
            const response = await request.get(
                '/api/images?filename=aaaa&format=jpg'
            );
            expect(response.text).toBe('<h3>Requested image not found.</>');
        });
        it('expect "/api/images?filename=fjord&format=aaa" (unsupported image format) to respond with status code 200.', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=aaa'
            );
            expect(response.status).toBe(200);
        });
        it('expect "/api/images?filename=fjord&format=aaa" (unsupported image format) to respond with "text/html".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=aaa'
            );
            expect(response.type).toBe('text/html');
        });
        it('expect "/api/images?filename=fjord&format=aaa" (unsupported image format) to respond with "<h3>Unsupported image format!</h3><p>API currently works with jpg, png, webp file formats</p>".', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&format=aaa'
            );
            expect(response.text).toBe(
                '<h3>Unsupported image format!</h3><p>API currently works with jpg, png, webp file formats</p>'
            );
        });
        afterAll(async () => {
            try {
                await fs.rm(testImageOrigPNG);
            } catch (error) {
                console.log('PNG image does not exist');
            }
            try {
                await fs.rm(testImageOrigWebP);
            } catch (error) {
                console.log('WebP image does not exist');
            }
        });
    });
    afterAll(async () => {
        try {
            await fs.rm(testImageResizedJPG);
        } catch (error) {
            console.log('JPG image does not exist');
        }
        try {
            await fs.rm(testImageResizedPNG);
        } catch (error) {
            console.log('PNG does not exist');
        }
        try {
            await fs.rm(testImageResizedWebp);
        } catch (error) {
            console.log('WebP does not exist');
        }
    });
});
