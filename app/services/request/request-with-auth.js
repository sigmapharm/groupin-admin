import history from 'utils/history';
import request from './request';
import AccessTokenStorage from '../security/AccessTokenStorage';

const requestWithAuth = (url, options) => {
  const optionsWithAuth = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: AccessTokenStorage.get(),
    },
  };
  return request(url, optionsWithAuth).catch(e => {
    if (e.response && e.response.status === 401) {
      AccessTokenStorage.clear();
      history.push('/login');
    } else {
      throw e;
    }
  });
};

export const get = (url, options) =>
  requestWithAuth(url, { ...options, method: 'GET' });

export const post = (url, options) =>
  requestWithAuth(url, { ...options, method: 'POST' });

export const put = (url, options) =>
  requestWithAuth(url, { ...options, method: 'PUT' });

export default requestWithAuth;
