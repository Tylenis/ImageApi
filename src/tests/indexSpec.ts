import path from 'path';
import { promises as fs } from 'fs';
import supertest from 'supertest';

import app from '../index';
import { imageResize } from '../utilities/imageEditor';

const request = supertest(app);

describe('Test endoints', () => {
    const assetssPath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
    const thumbsPath = path.resolve(assetssPath, 'assets', 'thumb');
    const testImagePath = path.resolve(
        assetssPath,
        'assets',
        'images',
        'fjord.jpg'
    );
    const testImageResized = path.resolve(thumbsPath, 'fjord_600_800.jpg');

    beforeAll(async () => {
        await imageResize(testImagePath, thumbsPath, 600, 800);
    });

    afterAll(async () => {
        try {
            await fs.rm(testImageResized);
        } catch (error) {
            console.log(' Test image was not removed');
        }
    });

    it('expect "/api/images?filename=fjord" respond with image/jpeg', async () => {
        const response = await request.get('/api/images?filename=fjord');
        expect(response.type).toBe('image/jpeg');
    });

    it('expect "/api/images?filename=fjord&width=800&height=600" respond with image/jpeg', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=800&height=600'
        );
        expect(response.type).toBe('image/jpeg');
    });

    it('expect "/api/images?filename=fjord&width=800" respond with text/html', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=800'
        );
        expect(response.type).toBe('text/html');
    });
    it('expect "/api/images?filename=fjord&width=800" respond "<h3>Check you url! Looks like it\'s missing filename or height/width parameters.</>"', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=800'
        );
        expect(response.text).toBe(
            "<h3>Check you url! Looks like it's missing filename or height/width parameters.</>"
        );
    });
    it('expect "/api/images?filename=fjord&height=600" respond with text/html', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&height=600'
        );
        expect(response.type).toBe('text/html');
    });
    it('expect "/api/images?filename=fjord&height=600" respond "<h3>Check you url! Looks like it\'s missing filename or height/width parameters.</>"', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&height=800'
        );
        expect(response.text).toBe(
            "<h3>Check you url! Looks like it's missing filename or height/width parameters.</>"
        );
    });
    it('expect "/api/images?filename=aaaa" respond with text/html', async () => {
        const response = await request.get('/api/images?filename=aaaa');
        expect(response.type).toBe('text/html');
    });
    it('expect "/api/images?filename=aaaa" respond "<h3>Requested image not found.</h3>"', async () => {
        const response = await request.get('/api/images?filename=aaaa');
        expect(response.text).toBe('<h3>Requested image not found.</>');
    });
});
