import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {GET_USERS_LIST_ACTION, MANAGE_CREATE_USER_RESPONSE, SUBMIT_CREATE_USER} from './constants';
import { manageCreateUserResponse, putUsersList } from './actions';
import ApiRoutes from '../../core/ApiRoutes';

function* usersListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?size=${action.payload.rowsPerPage}&page=${
      action.payload.page
    }&firstName=${action.payload.prenom}&lastName=${
      action.payload.nom
    }&pharmacie=${action.payload.pharmacie}`;
    yield callApi(`/users${params}`, putUsersList, options, null);
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

function* addNewUserWorker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      ville: null,
      region: null,
    }),
  };
  try {
    yield callApi(
      ApiRoutes.USERS,
      manageCreateUserResponse,
      options,
      null,
      false,
      false,
      callback,
    );
  } catch (e) {
    callback(null);
  }
}

function* manageCreateUserResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* usersListSagas() {
  yield all([
    takeLatest(GET_USERS_LIST_ACTION, usersListWorker),
    takeLatest(SUBMIT_CREATE_USER, addNewUserWorker),
    takeLatest(MANAGE_CREATE_USER_RESPONSE, manageCreateUserResponseWorker),
  ]);
}

export default usersListSagas;
