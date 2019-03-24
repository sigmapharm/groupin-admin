import { MANAGE_LOGIN_RESPONSE, SUBMIT_LOGIN } from './constants';

const submitLogin = values => ({
  type: SUBMIT_LOGIN,
  payload: { ...values },
});

const manageLoginResponse = response => ({
  type: MANAGE_LOGIN_RESPONSE,
  payload: { ...response },
});

export { submitLogin, manageLoginResponse };
