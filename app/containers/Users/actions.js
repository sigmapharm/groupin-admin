import {
  GET_USERS_LIST_ACTION,
  MANAGE_CREATE_USER_RESPONSE,
  MANAGE_UPDATE_USER_RESPONSE,
  PUT_USERS_LIST_ACTION,
  SUBMIT_CREATE_USER,
  SUBMIT_UPDATE_USER,
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

const manageUpdateserResponse = (response, callback) => ({
  type: MANAGE_UPDATE_USER_RESPONSE,
  payload: { ...response },
  callback,
});

export const createUser = (formData, callback) => ({
  type: SUBMIT_CREATE_USER,
  payload: { ...formData },
  callback,
});

export const updateUser = formData => ({
  type: SUBMIT_UPDATE_USER,
  payload: { ...formData },
});

export {
  getUsersList,
  putUsersList,
  manageCreateUserResponse,
  manageUpdateserResponse,
};
