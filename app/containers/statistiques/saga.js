import { all, put, takeLatest } from 'redux-saga/effects';
import {
  GET_ARTICLE_STATS,
  GET_PHARMA_STATS,
  GET_LABOS_STATS,
  GET_CITY_STATS,
  GET_PRINT_PHRAMA_STATS,
  GET_REG_STATS,
} from './constants';
import { putArticles, putPharmas, putLabos, putCity, putPrintPharama, putReg } from './actions';
import { callApi } from '../../services/saga';

import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';

// articles
function* ArticlesListWorker(action) {
  const page = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/article${page || ''}`, options);
      yield put(putArticles(res));
    } catch (e) {
      console.log(e);
    }
  });
}

// phramas
function* PharmasListWorker(action) {
  const page = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/pharmacy${page || ''}`, options);
      yield put(putPharmas(res));
    } catch (e) {
      console.log(e);
    }
  });
}

// labos
function* LabosListWorker(action) {
  const page = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/laboratory${page || ''}`, options);
      yield put(putLabos(res));
    } catch (e) {
      console.log(e);
    }
  });
}

// city

function* CityListWorker(action) {
  const page = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/city${page || ''}`, options);
      yield put(putCity(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* RegListWorker(action) {
  const page = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/region${page || ''}`, options);
      yield put(putReg(res));
    } catch (e) {
      console.log(e);
    }
  });
}

// print pharama

function* printPharamaWorker({ payload: { callback, fromDate, toDate } }) {
  const options = {
    method: 'GET',
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/pharmacies/print?from=${fromDate}&to=${toDate}`, options, true);
      yield callback && callback(null, res);
    } catch (e) {
      yield callback && callback(e, null);
    }
  });
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

function* reportingSagas() {
  yield all([
    takeLatest(GET_ARTICLE_STATS, ArticlesListWorker),
    takeLatest(GET_PHARMA_STATS, PharmasListWorker),
    takeLatest(GET_LABOS_STATS, LabosListWorker),
    takeLatest(GET_CITY_STATS, CityListWorker),
    takeLatest(GET_PRINT_PHRAMA_STATS, printPharamaWorker),
    takeLatest(GET_REG_STATS, RegListWorker),
  ]);
}

export default reportingSagas;
