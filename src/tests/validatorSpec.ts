import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import { expect } from 'chai';

import {
    validateSizeParams,
    validateOutputFormat,
} from '../middleware/validators';

describe('Check validators.ts module works as expected.', (): void => {
    describe('Check validateSizeParams function works as expected.', (): void => {
        it('expect validateSizeparams function calls next() if "height" and "width" parameters both are present.', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', height: '600', width: '800' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateSizeParams(fakeReq, fakeRes, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
        it('expect validateSizeparams function calls next() if "height" and "width" parameters both are missing.', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateSizeParams(fakeReq, fakeRes, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
        it('expect validateSizeparams function calls res.send() if one of "height" and "width" parameters is missing.', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', height: '600' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateSizeParams(fakeReq, fakeRes, nextSpy);
            expect(
                fakeRes.send.calledOnceWith(
                    `<h3>Invalid height/width parameters</h3><p>Both height and width parameters are required.</p>`
                )
            ).to.be.true;
        });
        it('expect validateSizeparams function calls res.send() if one of "height" and "width" parameters is not a valid number.', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', height: '600', width: 'aa' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateSizeParams(fakeReq, fakeRes, nextSpy);
            expect(
                fakeRes.send.calledOnceWith(
                    `<h3>Invalid height/width parameters</h3><p>Both height and width parameters are required.</p>`
                )
            ).to.be.true;
        });
        it('expect validateSizeparams function calls res.send() if one of "height" and "width" parameters is zero.', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', height: '600', width: '0' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateSizeParams(fakeReq, fakeRes, nextSpy);
            expect(
                fakeRes.send.calledOnceWith(
                    `<h3>Invalid height/width parameters</h3><p>Both height and width parameters are required.</p>`
                )
            ).to.be.true;
        });
    });
    describe('Check validateOutputFormat function works as expected.', (): void => {
        it('expect validateOutputFormat function calls next() if "format" parameter is "jpg".', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', format: 'jpg' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateOutputFormat(fakeReq, fakeRes, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
        it('expect validateOutputFormat function calls next() if "format" parameter is "png".', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', format: 'png' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateOutputFormat(fakeReq, fakeRes, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
        it('expect validateOutputFormat function calls next() if "format" parameter is "webp".', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', format: 'webp' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateOutputFormat(fakeReq, fakeRes, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
        it('expect validateOutputFormat function calls res.send() if "format" parameter is not valid.', (): void => {
            const fakeReq = mockReq();
            fakeReq.query = { filename: 'fjord', format: 'aaa' };
            const fakeRes = mockRes();
            const nextSpy = sinon.spy();
            validateOutputFormat(fakeReq, fakeRes, nextSpy);
            expect(
                fakeRes.send.calledOnceWith(
                    `<h3>Invalid format parameter</h3><p>Currently works with jpg, png, webp.</p>`
                )
            ).to.be.true;
        });
    });
});
