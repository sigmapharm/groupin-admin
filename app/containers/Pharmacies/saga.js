import { takeLatest, all, put } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { manageCreatePharmacieResponse, putPharmaciesList, putPharmacieFormData } from './actions';
import ApiRoutes from '../../core/ApiRoutes';
import {
  GET_PHARMACIE_FORM_DATA,
  GET_PHARMACIES_LIST_ACTION,
  MANAGE_CREATE_PHARMACIE_RESPONSE,
  SUBMIT_CREATE_PHARMACIE,
  SUBMIT_DELETE_PHARMACIE,
} from './constants';
import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';

// TODO : optimize options http header later ;)

function* getPharmacieDetailsWorker({ payload: { id } }) {
  console.log('id', id);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(`/pharmacies/${id}`, putPharmacieFormData, options, null);
  } catch (e) {
    // eslint-disable-line
  }
}

function* pharmaciesListWorker(action) {
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
      const params = `?size=${action.payload.rowsPerPage}&page=${action.payload.page}&denomination=${
        action.payload.denomination
      }&numRC=${action.payload.numRC}&patente=${action.payload.patente}${sortQuery}`;
      const res = yield requestWithAuth(`/pharmacies/list${params}`, options);
      yield put(putPharmaciesList(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
      // eslint-disable-line
    }
  });
}

function* deletePharmacieworker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.PHARMACIES}/${payload.pharmacyId}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* addOrUpdatePharmacieWorker(action) {
  const {
    payload: { pharmacyId, ...payload },
    callback,
  } = action;
  const options = {
    method: pharmacyId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
    }),
  };

  try {
    yield callApi(
      `${ApiRoutes.PHARMACIES}${pharmacyId ? `/${pharmacyId}` : ''}`,
      manageCreatePharmacieResponse,
      options,
      null,
      false,
      false,
      callback && callback(),
    );
  } catch (e) {
    yield put(manageCreatePharmacieResponse(e.response, callback(e)));
    // callback && callback(e)(e.response);
  }
}

function* manageCreatePharmacieResponseWorker(action) {
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

function* pharmacieListSagas() {
  yield all([
    takeLatest(GET_PHARMACIE_FORM_DATA, getPharmacieDetailsWorker),
    takeLatest(GET_PHARMACIES_LIST_ACTION, pharmaciesListWorker),
    takeLatest(SUBMIT_CREATE_PHARMACIE, addOrUpdatePharmacieWorker),
    takeLatest(SUBMIT_DELETE_PHARMACIE, deletePharmacieworker),
    takeLatest(MANAGE_CREATE_PHARMACIE_RESPONSE, manageCreatePharmacieResponseWorker),
  ]);
}

export default pharmacieListSagas;
