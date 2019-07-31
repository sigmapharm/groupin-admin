import _ from 'lodash';
import history from 'utils/history';
import { put } from 'redux-saga/effects';
import ApiPathService from '../api/ApiPathService';
import AccessTokenStorage from '../security/AccessTokenStorage';
import { resetUserInStore } from '../../containers/App/actions';
export const post = (url, options) =>
  request(url, { ...options, method: 'POST' });

export const checkStatus = async response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.status = response.status;
  let res = await response.text();
  res = _.isEmpty(res) ? {} : JSON.parse(res);
  error.response = res;
  return Promise.reject(error);
};

const request = function * (url, options) {
  const baseApiPath = ApiPathService.getBasePath();

  try {
    return yield fetch(`${baseApiPath}${url}`, options)
      .then(checkStatus)
      .then(res => res.text())
      .then(e => (_.isEmpty(e) ? {} : JSON.parse(e)));
  } catch (e) {
    if (e.status === 401) {
      AccessTokenStorage.clear();
      yield put(resetUserInStore());
      yield history.push('/login');
      return;
    }
    return yield Promise.reject(e);
  }
};
const requestBlob = function * (url, options) {
  const baseApiPath = ApiPathService.getBasePath();
  try {
    return yield fetch(`${baseApiPath}${url}`, options)
      .then(checkStatus)
      .then(res => res.blob());
  } catch (e) {
    if (e.status === 401) {
      AccessTokenStorage.clear();
      yield put(resetUserInStore());
      yield history.push('/login');
      return;
    }
    return yield Promise.reject(e);
  }
};

export { request, requestBlob };
