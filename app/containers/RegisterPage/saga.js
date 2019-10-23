import { all, takeLatest } from 'redux-saga/effects';
import history from 'utils/history';
import { checkStatus } from '../../services/request/request';
import ApiRoutes from '../../core/ApiRoutes';
import { REGISTER_USER, VERIFY_TOKEN } from './constants';
import ApiPathService from '../../services/api/ApiPathService';

function* verifyTokenWorker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const baseApiPath = ApiPathService.getBasePath();
  return fetch(`${baseApiPath}${ApiRoutes.REGISTER}/verify/${payload}`, options)
    .then(checkStatus)
    .then(res => res.json())
    .then(callback)
    .catch(e => {
        alert(e); // eslint-disable-line
      callback(false);
    });
}

function* registerUserWorker(action) {
  const { payload, callback } = action;
  const { token, password, passwordConfirmation } = payload;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      password,
      passwordConfirmation,
    }),
  };
  const baseApiPath = ApiPathService.getBasePath();
  return fetch(`${baseApiPath}${ApiRoutes.REGISTER}`, options)
    .then(checkStatus)
    .then(res => res.json())
    .then(() => {
      callback();
    })
    .catch(e => {
      callback(e)
    });
}

function* manageVerifyTokenResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* registrationSaga() {
  yield all([
    takeLatest(VERIFY_TOKEN, verifyTokenWorker),
    takeLatest(REGISTER_USER, registerUserWorker),
  ]);
}

export default registrationSaga;
