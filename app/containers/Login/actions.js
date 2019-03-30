import {
  MANAGE_LOGIN_RESPONSE,
  SUBMIT_LOGIN,
  DISPLAY_LOGIN_ERROR,
} from './constants';

const submitLogin = values => ({
  type: SUBMIT_LOGIN,
  payload: { ...values },
});

const manageLoginResponse = response => ({
  type: MANAGE_LOGIN_RESPONSE,
  payload: { ...response },
});

const displayLoginError = values => ({
  type: DISPLAY_LOGIN_ERROR,
  payload: { ...values },
});

export { submitLogin, manageLoginResponse, displayLoginError };
