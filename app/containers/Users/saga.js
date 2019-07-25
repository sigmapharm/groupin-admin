import { all, put, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {
  GET_USERS_LIST_ACTION,
  MANAGE_CREATE_USER_RESPONSE,
  MANAGE_UPDATE_USER_RESPONSE,
  RESET_USER,
  SUBMIT_CREATE_USER,
  SUBMIT_UPDATE_USER,
  TOGGLE_USER,
} from './constants';
import { manageCreateUserResponse, putUsersList } from './actions';
import requestWithAuth from '../../services/request/request-with-auth';
import ApiRoutes from '../../core/ApiRoutes';

function* usersListWorker(action) {
  const { callback } = action;
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
    const res = yield requestWithAuth(`/users${params}`, options);
    yield put(putUsersList(res));
    // yield callApi(`/users${params}`, putUsersList, options, null);
    yield callback && callback();
  } catch (e) {
    console.log(e); // eslint-disable-line
    yield callback && callback(e);
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
      // ville: null,
      // region: null,
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
    const res = yield requestWithAuth(ApiRoutes.USERS, options);
    yield put(manageCreateUserResponse(res, callback));
  } catch (e) {
    yield put(manageCreateUserResponse(e.response, callback));
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
    yield requestWithAuth(`${ApiRoutes.USERS}/${userId}/${nextState}`, options);
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
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
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
    }),
  };
  try {
    yield requestWithAuth(`${ApiRoutes.USERS}/${payload.id}`, options);
    // yield callApi(
    //   `${ApiRoutes.USERS}/${payload.id}`,
    //   null,
    //   options,
    //   null,
    //   true,
    //   true,
    //   null,
    // );
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
  }
}

function* resetUserWorker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
    }),
  };
  try {
    yield requestWithAuth(
      `${ApiRoutes.USERS}/${payload.userId}/reset`,
      options,
    );
    // yield callApi(
    //   `${ApiRoutes.USERS}/${payload.userId}/reset`,
    //   null,
    //   options,
    //   null,
    //   true,
    //   true,
    //   null,
    // );
    yield callback && callback();
  } catch (e) {
    alert(e); // eslint-disable-line
    yield callback && callback(e);
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
    takeLatest(RESET_USER, resetUserWorker),
    takeLatest(MANAGE_UPDATE_USER_RESPONSE, manageUpdateUserResponseWorker),
  ]);
}

export default usersListSagas;
