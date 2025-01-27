import { all, put, takeLatest } from 'redux-saga/effects';
import {
  // eslint-disable-next-line import/named
  DELETE_USER,
  GET_PROFILE,
  GET_USERS_LIST_ACTION,
  MANAGE_CREATE_USER_RESPONSE,
  MANAGE_UPDATE_USER_RESPONSE,
  RESET_PASSWORD,
  RESET_USER,
  SUBMIT_CREATE_USER,
  SUBMIT_UPDATE_USER,
  TOGGLE_USER,
  GET_USER_INFO,
  EXPORT_USERS_CSV,
  GET_COMMANDS_USER,
} from './constants';
import { manageCreateUserResponse, putUsersList, putUserProfile, putUSerCommnadsList } from './actions';
import requestWithAuth from '../../services/request/request-with-auth';
import ApiRoutes from '../../core/ApiRoutes';
import * as GlobalActions from '../App/actions';

function* usersListWorker(action) {
  const { callback } = action;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const { cols, from, to } = action.payload;
      const sortQuery = cols
        .filter(({ selected }) => selected)
        .reduce((acc, n) => acc.concat(`&sort=${n.colName},${n.order}`), '');
      const params = `?size=${action.payload.rowsPerPage}&page=${action.payload.page}&firstName=${
        action.payload.prenom
      }&lastName=${action.payload.nom}&pharmacy=${action.payload.pharmacie}&region=${
        action.payload.region
      }${sortQuery}&from=${from}&to=${to}`;
      const res = yield requestWithAuth(`/users${params}`, options);
      yield put(putUsersList(res));
      yield callback && callback();
    } catch (e) {
      console.log(e); // eslint-disable-line
      yield callback && callback(e);
    }
  });
}
function* getProfileWorker(action) {
  const { callback } = action;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/users/profile`, options);
      yield put(putUserProfile(res));
      yield callback && callback();
    } catch (e) {
      console.log(e); // eslint-disable-line
      yield callback && callback(e);
    }
  });
}

function* getUserInfo(action) {
  const { callback, id } = action.callback;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/users/${id || ''}`, options);
      yield callback && callback(false, res);
    } catch (e) {
      console.log(e); // eslint-disable-line
      yield callback && callback(true, null);
    }
  });
}

function* addNewUserWorker(action) {
  const { payload, callback } = action;
  const isLaboAddMode = payload.isLaboAddMode;
  let pharma = {};
  console.log('action', action, isLaboAddMode);

  if (!isLaboAddMode) {
    pharma = {
      ...payload.pharmacie,
      formeJuridique: payload.pharmacie.formeJuridique.value,
      banque: payload.pharmacie.banque.value,
      ville: { id: payload.pharmacie.ville.value },
      region: { id: payload.pharmacie.region.value },
    };
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...{
        ...payload,
        pharmacie: pharma,
      },
    }),
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(isLaboAddMode ? '/users/add-laboUser' : ApiRoutes.USERS, options);
      yield put(manageCreateUserResponse(res, callback));
    } catch (e) {
      yield put(manageCreateUserResponse(e.response, callback));
    }
  });
}

function* toggleUserWorker(action) {
  const { payload } = action;
  const { userId, value, callback } = payload;
  const nextState = value ? 'enable' : 'disable';
  console.log(value);
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
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.USERS}/${userId}/${nextState}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
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
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.USERS}/${payload.id}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* deleteUserWorker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.USERS}/${payload.userId}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e.response);
    }
  });
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
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.USERS}/${payload.userId}/reset`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}
function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

function* manageUpdateUserResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* restePasswordWorker(action) {
  const { callback, payload } = action;
  const body = JSON.stringify(payload);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`${ApiRoutes.USERS}/update/password`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* getUserCommnadsList(action) {
  const {
    payload: { userId, callback },
  } = action;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`${ApiRoutes.USERS}/commands/${userId}`, options);
      yield callback && callback(res, null);
    } catch (e) {
      callback && callback([], e);
    }
  });
}

function* exportUsersCsvWorker(action) {
  const { callback } = action.payload;
  console.log('Saga reached');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv',
      // 'Content-Disposition': 'attachment; filename=' + 'filename.csv',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/users/export`, options, true);

      yield callback && callback(false, res);
    } catch (e) {
      console.log(e); // eslint-disable-line
      yield callback && callback(true, null);
    }
  });
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
    takeLatest(DELETE_USER, deleteUserWorker),
    takeLatest(RESET_PASSWORD, restePasswordWorker),
    takeLatest(GET_PROFILE, getProfileWorker),
    takeLatest(GET_USER_INFO, getUserInfo),
    takeLatest(EXPORT_USERS_CSV, exportUsersCsvWorker),
    takeLatest(GET_COMMANDS_USER, getUserCommnadsList),
  ]);
}

export default usersListSagas;
