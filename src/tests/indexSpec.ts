import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endoints', () => {
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
