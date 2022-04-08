import { MANAGE_LOGIN_RESPONSE, SUBMIT_LOGIN, DISPLAY_LOGIN_ERROR, PUT_EMAIL_RESET, GET_EMAIL_RESET } from './constants';

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

// password reset
const getEmailAddress = payload => ({
  type: GET_EMAIL_RESET,
  payload,
});

const putEmailAddress = payload => ({
  type: PUT_EMAIL_RESET,
  payload,
});

export { submitLogin, manageLoginResponse, displayLoginError, getEmailAddress, putEmailAddress };
