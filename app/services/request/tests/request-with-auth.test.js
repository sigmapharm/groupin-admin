import 'isomorphic-fetch';
import history from 'utils/history';
import requestWithAuth, { get, post, put } from '../request-with-auth';
import * as request from '../request';
import AccessTokenStorage from '../../security/AccessTokenStorage';

describe('request with authorization header', () => {
  beforeEach(() => {
    request.default = jest.fn(() => Promise.resolve('requestResponse'));
    AccessTokenStorage.get = jest.fn(() => 'accessToken');
  });
  it('should request with authorization header', done => {
    requestWithAuth('/random-url', {}).then(response => {
      expect(response).toEqual('requestResponse');
      expect(AccessTokenStorage.get).toHaveBeenCalledTimes(1);
      expect(request.default).toHaveBeenCalledWith('/random-url', {
        headers: {
          Authorization: 'accessToken',
        },
      });
      done();
    });
  });

  describe('specific http methods helpers', () => {
    it('should send GET method', done => {
      get('/random-url', {}).then(() => {
        expect(request.default).toHaveBeenCalledWith('/random-url', {
          method: 'GET',
          headers: {
            Authorization: 'accessToken',
          },
        });
        done();
      });
    });
    it('should send POST method', done => {
      post('/random-url', {}).then(() => {
        expect(request.default).toHaveBeenCalledWith('/random-url', {
          method: 'POST',
          headers: {
            Authorization: 'accessToken',
          },
        });
        done();
      });
    });
    it('should send PUT method', done => {
      put('/random-url', {}).then(() => {
        expect(request.default).toHaveBeenCalledWith('/random-url', {
          method: 'PUT',
          headers: {
            Authorization: 'accessToken',
          },
        });
        done();
      });
    });
  });
});
describe('requestWithAuth rejection', () => {
  beforeEach(() => {
    // given
    const errorResponse = new Response(null, { status: 401 });
    const error = new Error(errorResponse.statusText);
    error.response = errorResponse;
    request.default = jest.fn(() => Promise.reject(error));
    history.push = jest.fn();
    AccessTokenStorage.clear = jest.fn();
  });
  it('should redirect to login when 401', done => {
    requestWithAuth('/random-url', {}).then(() => {
      // then
      expect(history.push).toHaveBeenCalledWith('/login');
      expect(AccessTokenStorage.clear).toHaveBeenCalled();
      done();
    });
  });

  it('should throw the error when no 401', done => {
    // given
    const errorResponse = new Response(null, { status: 404 });
    const error = new Error(errorResponse.statusText);
    error.response = errorResponse;
    request.default = jest.fn(() => Promise.reject(error));
    // when
    requestWithAuth('/random-url', {}).catch(err => {
      // then
      expect(err.response.status).toEqual(404);
      done();
    });
  });
});
