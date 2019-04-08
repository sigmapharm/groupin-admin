import {
  GET_USERS_LIST_ACTION,
  MANAGE_CREATE_USER_RESPONSE,
  PUT_USERS_LIST_ACTION,
  SUBMIT_CREATE_USER,
} from './constants';

const getUsersList = values => ({
  type: GET_USERS_LIST_ACTION,
  payload: { ...values },
});

const putUsersList = values => ({
  type: PUT_USERS_LIST_ACTION,
  payload: { ...values },
});

const manageCreateUserResponse = (response, callback) => ({
  type: MANAGE_CREATE_USER_RESPONSE,
  payload: { ...response },
  callback,
});

export const createUser = (formData, callback) => ({
  type: SUBMIT_CREATE_USER,
  payload: { ...formData },
  callback,
});

export { getUsersList, putUsersList, manageCreateUserResponse };
