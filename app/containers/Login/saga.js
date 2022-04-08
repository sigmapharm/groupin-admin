import { all, put, takeLatest } from 'redux-saga/effects';
import history from 'utils/history';
import { callApi } from '../../services/saga';
import { GET_EMAIL_RESET, MANAGE_LOGIN_RESPONSE, SUBMIT_LOGIN } from './constants';
import AccessTokenStorage from '../../services/security/AccessTokenStorage';
import { manageLoginResponse, displayLoginError, putEmailAddress } from './actions';
import { LOGOUT } from '../App/constants';
import { resetUserInStore } from '../App/actions';

function* submitLoginWorker(action) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...action.payload }),
  };

  try {
    yield callApi('/login', manageLoginResponse, options, null);
  } catch (e) {}
}

function* emailPasswordResetWorker({ payload: { email, callback } }) {
  const options = {
    method: 'GET',
  };

  try {
    yield callApi(`/users/forgotPassword?email=${email}`, putEmailAddress, options, null);
    yield callback && callback(true);
  } catch (e) {
    yield callback && callback(false);
  }
}

function* manageLoginResponseWorker(action) {
  const { access_token } = action.payload; // eslint-disable-line
  if (access_token) {
    // eslint-disable-line
    AccessTokenStorage.set(access_token);
    history.push('/');
  } else {
    yield put(displayLoginError());
  }
}

function* logoutWorker() {
  yield AccessTokenStorage.clear();
  yield put(resetUserInStore());
  yield history.push('/login');
}

function* loginPageSagas() {
  yield all([
    takeLatest(SUBMIT_LOGIN, submitLoginWorker),
    takeLatest(MANAGE_LOGIN_RESPONSE, manageLoginResponseWorker),
    takeLatest(LOGOUT, logoutWorker),
    takeLatest(GET_EMAIL_RESET, emailPasswordResetWorker),
  ]);
}
export default loginPageSagas;
