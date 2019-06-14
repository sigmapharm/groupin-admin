import { REGISTER_USER, VERIFY_TOKEN } from './constants';

export const registerUser = (token, password, passwordConfirmation) => ({
  type: REGISTER_USER,
  payload: {
    token,
    password,
    passwordConfirmation,
  },
});

export const verifyToken = (payload, callback) => ({
  type: VERIFY_TOKEN,
  payload,
  callback,
});
