import { takeLatest, all, put } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { manageCreateLaboratoireResponse, putLaboratoiresList, putLaboratoireFormData } from './actions';
import ApiRoutes from '../../core/ApiRoutes';
import {
  GET_LABORATOIRE_FORM_DATA,
  GET_LABORATOIRES_LIST_ACTION,
  MANAGE_CREATE_LABORATOIRE_RESPONSE,
  SUBMIT_CREATE_LABORATOIRE,
  SUBMIT_DELETE_LABORATOIRE,
  GET_LABORATOIRE_DETAILS,
} from './constants';
import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';

// TODO : optimize options http header later ;)

function* getLaboratoireDetailsWorker({ payload: { id } }) {
  console.log('id', id);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(`/laboratoires/${id}`, putLaboratoireFormData, options, null);
  } catch (e) {
    // eslint-disable-line
  }
}

function* laboratoiresListWorker(action) {
  const { callback } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const { cols } = action.payload;
      const sortQuery = cols
        .filter(({ selected }) => selected)
        .reduce((acc, n) => acc.concat(`&sort=${n.colName},${n.order}`), '');
      const params = `?size=${action.payload.rowsPerPage}&page=${action.payload.page}&nom=${action.payload.nom}&email=${
        action.payload.email
      }&website=${action.payload.website}${sortQuery}`;
      const res = yield requestWithAuth(`/laboratoires/list${params}`, options);
      yield put(putLaboratoiresList(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
      // eslint-disable-line
    }
  });
}

function* deleteLaboratoireworker(action) {
  console.log('action', action);
  const { payload, callback } = action;
  console.log('payload', payload);
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      `${ApiRoutes.LABORATOIRES}/${payload.laboratoryId}`;
      yield requestWithAuth(`${ApiRoutes.LABORATOIRES}/${payload.laboratoryId}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* addOrUpdateLaboratoireWorker(action) {
  const {
    payload: { laboratoryId, ...payload },
    callback,
  } = action;
  const options = {
    method: laboratoryId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
    }),
  };

  try {
    yield callApi(
      `${ApiRoutes.LABORATOIRES}${laboratoryId ? `/${laboratoryId}` : ''}`,
      manageCreateLaboratoireResponse,
      options,
      null,
      false,
      false,
      callback && callback(),
    );
  } catch (e) {
    yield put(manageCreateLaboratoireResponse(e.response, callback(e)));
    // callback && callback(e)(e.response);
  }
}

function* manageCreateLaboratoireResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

function* laboratoireListSagas() {
  yield all([
    takeLatest(GET_LABORATOIRE_DETAILS, getLaboratoireDetailsWorker),
    takeLatest(GET_LABORATOIRES_LIST_ACTION, laboratoiresListWorker),
    takeLatest(SUBMIT_CREATE_LABORATOIRE, addOrUpdateLaboratoireWorker),
    takeLatest(SUBMIT_DELETE_LABORATOIRE, deleteLaboratoireworker),
    takeLatest(MANAGE_CREATE_LABORATOIRE_RESPONSE, manageCreateLaboratoireResponseWorker),
  ]);
}

export default laboratoireListSagas;
