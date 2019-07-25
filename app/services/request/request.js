import _ from 'lodash';
import ApiPathService from '../api/ApiPathService';

export const post = (url, options) =>
  request(url, { ...options, method: 'POST' });

export const checkStatus = async response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  let res = await response.text();
  res = _.isEmpty(res) ? {} : JSON.parse(res);
  error.response = res;
  return Promise.reject(error);
};

const request = (url, options) => {
  const baseApiPath = ApiPathService.getBasePath();
  return fetch(`${baseApiPath}${url}`, options)
    .then(checkStatus)
    .then(res => res.text())
    .then(e => (_.isEmpty(e) ? {} : JSON.parse(e)));
};
const requestBlob = (url, options) => {
  const baseApiPath = ApiPathService.getBasePath();
  return fetch(`${baseApiPath}${url}`, options)
    .then(checkStatus)
    .then(res => res.blob());
};

export { request, requestBlob };
