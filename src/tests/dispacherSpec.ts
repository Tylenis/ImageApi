import { dispatchQuery } from '../utilities/dispacher';

describe('Check dispatchQuery function works as expected.', () => {
    it('expect dispatchQuery function  to return "thumb" if "height" and "wdth" parameters are valid.', () => {
        const dispatch = dispatchQuery('fjord', 600, 800);
        expect(dispatch).toBe('thumb');
    });

    it('expect dispatchQuery function  to return "images" if "height" or "width" parameters are NaN.', async () => {
        const dispatch = await dispatchQuery('fjord', NaN, NaN);
        expect(dispatch).toBe('images');
    });
});
