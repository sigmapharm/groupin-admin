import ApiPathService from '../api/ApiPathService';

export const post = (url, options) =>
  request(url, { ...options, method: 'POST' });

export const checkStatus = response => {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 400
  ) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const request = (url, options) => {
  const baseApiPath = ApiPathService.getBasePath();
  return fetch(`${baseApiPath}${url}`, options)
    .then(checkStatus)
    .then(res => res.json());
};

export default request;
