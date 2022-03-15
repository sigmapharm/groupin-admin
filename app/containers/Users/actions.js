import {
  GET_USERS_LIST_ACTION,
  MANAGE_CREATE_USER_RESPONSE,
  MANAGE_UPDATE_USER_RESPONSE,
  PUT_USERS_LIST_ACTION,
  SUBMIT_CREATE_USER,
  SUBMIT_UPDATE_USER,
  TOGGLE_USER,
  RESET_USER,
  DELETE_USER,
  RESET_PASSWORD,
  GET_PROFILE,
  PUT_USER_PROFILE,
  RESET_PASSWORD_SUCCESS,
} from './constants';

const getUsersList = (values, callback) => ({
  type: GET_USERS_LIST_ACTION,
  payload: { ...values },
  callback,
});

const toggleUser = (userId, value, callback) => ({
  type: TOGGLE_USER,
  payload: {
    userId,
    value,
    callback,
  },
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

export const updateUser = (userId, formData, callback) => ({
  type: SUBMIT_UPDATE_USER,
  payload: { ...formData },
  callback,
});

export const resetUser = (userId, callback) => ({
  type: RESET_USER,
  payload: {
    userId,
  },
  callback,
});

export const deleteUser = (userId, callback) => ({
  type: DELETE_USER,
  payload: {
    userId,
  },
  callback,
});

export const resetPassword = ({ newPassword, oldPassword }, callback) => ({
  type: RESET_PASSWORD,
  payload: { newPassword, oldPassword },
  callback,
});
const resetPasswordSuccess = payload => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

export const getProfile = callback => ({
  type: GET_PROFILE,
  payload: {},
  callback,
});

export const putUserProfile = values => ({
  type: PUT_USER_PROFILE,
  payload: { ...values },
});

export {
  toggleUser,
  getUsersList,
  putUsersList,
  manageCreateUserResponse,
  manageUpdateserResponse,
  resetPasswordSuccess,
};
