import { all, put, takeLatest } from 'redux-saga/effects';
import * as GlobalActions from '../App/actions';

import requestWithAuth from '../../services/request/request-with-auth';
import {
  GET_LABOS_ANALYTICS,
  GET_PAHRAMCIES_ANALYTICS,
  PRINT_LABOS_ANALYTICS,
  PRINT_PAHRAMCIES_ANALYTICS,
  putLabosAnalytics,
  putPharmaciesAnalytics,
} from './actions';

function* analyticsList({ payload: { page = 0, from, to, laboName } }) {
  const options = {
    method: 'GET',
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(
        `/pharmacies/analytics?from=${from ? from : ''}&to=${to ? to : ''}&laboName=${laboName ? laboName : ''}`,
        options,
        false,
      );
      yield put(putPharmaciesAnalytics(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* analyticsLabosList({ payload: { page = 0, from, to } }) {
  const options = {
    method: 'GET',
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/laboratoires/analytics?from=${from}&to=${to}`, options, false);
      yield put(putLabosAnalytics(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* printAnalyticsList({ payload: { callback } }) {
  const options = {
    method: 'GET',
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/pharmacies/analytics/print`, options, false);
      yield callback && callback(res, null);
    } catch (e) {
      yield callback && callback(null, e);
    }
  });
}

function* printlabosAnalyticsList({ payload: { callback } }) {
  const options = {
    method: 'GET',
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/laboratoires/analytics/print`, options, false);
      yield callback && callback(res, null);
    } catch (e) {
      yield callback && callback(null, e);
    }
  });
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

export default function* PharmaciesAlalyticsSagas() {
  yield all([
    takeLatest(GET_PAHRAMCIES_ANALYTICS, analyticsList),
    takeLatest(PRINT_PAHRAMCIES_ANALYTICS, printAnalyticsList),
    takeLatest(GET_LABOS_ANALYTICS, analyticsLabosList),
    takeLatest(PRINT_LABOS_ANALYTICS, printlabosAnalyticsList),
  ]);
}
