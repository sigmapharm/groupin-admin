import { REGISTER_USER, VERIFY_TOKEN } from './constants';

export const registerUser = (token, password, passwordConfirmation,callback) => ({
  type: REGISTER_USER,
  payload: {
    token,
    password,
    passwordConfirmation,
  },
  callback,
});

export const verifyToken = (payload, callback) => ({
  type: VERIFY_TOKEN,
  payload,
  callback,
});
