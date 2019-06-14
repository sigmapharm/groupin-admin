import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {
  GET_USERS_LIST_ACTION,
  MANAGE_CREATE_USER_RESPONSE,
  MANAGE_UPDATE_USER_RESPONSE,
  SUBMIT_CREATE_USER,
  SUBMIT_UPDATE_USER,
  TOGGLE_USER,
} from './constants';
import {
  manageCreateUserResponse,
  manageUpdateserResponse,
  putUsersList,
} from './actions';
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

function* toggleUserWorker(action) {
  const { payload } = action;
  const { userId, value, callback } = payload;
  const nextState = value ? 'enable' : 'disable';
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
      `${ApiRoutes.USERS}/${userId}/${nextState}`,
      null,
      options,
      null,
      true,
      true,
      null,
    );
    callback();
  } catch (e) {
    callback();
  }
}

function* manageCreateUserResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* updateUserWorker(action) {
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
      manageUpdateserResponse,
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

function* manageUpdateUserResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* usersListSagas() {
  yield all([
    takeLatest(TOGGLE_USER, toggleUserWorker),
    takeLatest(GET_USERS_LIST_ACTION, usersListWorker),
    takeLatest(SUBMIT_CREATE_USER, addNewUserWorker),
    takeLatest(MANAGE_CREATE_USER_RESPONSE, manageCreateUserResponseWorker),
    takeLatest(SUBMIT_UPDATE_USER, updateUserWorker),
    takeLatest(MANAGE_UPDATE_USER_RESPONSE, manageUpdateUserResponseWorker),
  ]);
}

export default usersListSagas;
