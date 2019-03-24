import 'isomorphic-fetch';
import request, { checkStatus, post } from '../request';
import ApiPathService from '../../api/ApiPathService';

describe('request', () => {
  beforeEach(() => {
    window.fetch = jest.fn();
  });
  describe('successful response', () => {
    const options = {
      method: 'POST',
      body: {},
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    };
    beforeEach(() => {
      const response = new Response('{"msg": "Hello, world!!"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(response));
    });
    it('should call with options and format json response correctly', done => {
      request('/some-url', options)
        .then(json => {
          expect(json.msg).toEqual('Hello, world!!');
          done();
        })
        .catch(done);
      expect(window.fetch).toHaveBeenCalledWith(
        `${ApiPathService.getBasePath()}/some-url`,
        options,
      );
    });
    it('should accept response with code 400 (bad request)', done => {
      // given
      const response = new Response('{"errors": {"msg": "Hello, world!!"}}', {
        status: 400,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(response));
      // then
      request('/some-url', options)
        .then(json => {
          expect(json.errors).toEqual({ msg: 'Hello, world!!' });
          done();
        })
        .catch(done);
      expect(window.fetch).toHaveBeenCalledWith(
        `${ApiPathService.getBasePath()}/some-url`,
        options,
      );
    });
  });
  describe('response with status code error', () => {
    beforeEach(() => {
      const response = new Response('{"msg": "Hello, world!!"}', {
        status: 404,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(response));
    });
    it('should catch errors', done => {
      request('/some-url').catch(err => {
        expect(err.response.status).toBe(404);
        expect(err.response.statusText).toBe('Not Found');
        done();
      });
      done();
    });
  });
});
describe('checkStatus', () => {
  it('should return valid response', () => {
    const validResponseStatus200 = new Response(null, { status: 200 });
    expect(checkStatus(validResponseStatus200)).toBe(validResponseStatus200);
    const validResponseStatus299 = new Response(null, { status: 299 });
    expect(checkStatus(validResponseStatus299)).toBe(validResponseStatus299);
    const validResponseStatus400 = new Response(null, { status: 400 });
    expect(checkStatus(validResponseStatus400)).toBe(validResponseStatus400);
  });
  it('should return error when status code is not between 200 and 300 and not 400', () => {
    const errorResponse = new Response(null, { status: 401 });
    const error = new Error(errorResponse.statusText);
    error.response = errorResponse;
    try {
      checkStatus(errorResponse);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});

describe('post', () => {
  beforeEach(() => {
    const validResponseStatus200 = new Response('{}', { status: 200 });
    window.fetch = jest.fn();
    window.fetch.mockReturnValue(Promise.resolve(validResponseStatus200));
    process.env.NODE_ENV = 'production';
  });
  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });
  it('should submit post request', done => {
    post('/url', {}).then(() => {
      done();
    });
    expect(window.fetch).toHaveBeenCalledWith('/url', { method: 'POST' });
  });
});
