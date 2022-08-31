import { all, put, takeLatest } from 'redux-saga/effects';
import { GET_REPORTING_ACTION, GET_PRINT_REPORT_PDF, GET_REPORT_CA } from './constants';
import { putReporting, putReportinPDF, putReportinCA } from './actions';

import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';

function* reportingListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/reporting${action.payload || ''}`, options);
      yield put(putReporting(res));
    } catch (e) {}
  });
}

function* reportingCAWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/ca`, options);

      yield put(putReportinCA(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* reportingPdfListWorker({ payload: { searchInput, callback } }) {
  const options = {
    method: 'GET',
    'Content-Type': 'application/pdf',
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/statistics/reporting/print${searchInput ? searchInput : ''}`, options, true);
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
    takeLatest(GET_REPORTING_ACTION, reportingListWorker),
    takeLatest(GET_PRINT_REPORT_PDF, reportingPdfListWorker),
    takeLatest(GET_REPORT_CA, reportingCAWorker),
  ]);
}

export default reportingSagas;
