import { GET_USERS_LIST_ACTION, PUT_USERS_LIST_ACTION } from './constants';

const getUsersList = values => ({
  type: GET_USERS_LIST_ACTION,
  payload: { ...values },
});

const putUsersList = values => ({
  type: PUT_USERS_LIST_ACTION,
  payload: { ...values },
});

export { getUsersList, putUsersList };
