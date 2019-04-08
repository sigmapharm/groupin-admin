import {
  GET_USERS_LIST_ACTION,
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

export const createUser = (formData, callback) => ({
  type: SUBMIT_CREATE_USER,
  payload: { ...formData },
  callback,
});

export { getUsersList, putUsersList };
