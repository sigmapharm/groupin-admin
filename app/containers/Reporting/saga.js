import { all, put, takeLatest } from 'redux-saga/effects';
import { GET_REPORTING_ACTION } from './constants';
import { putReporting } from './actions';

import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';
function* reportingListWorker(action) {
  const { callback } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth('/statistics/reporting', options);
      yield put(putReporting(res));
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

function* reportingSagas() {
  yield all([takeLatest(GET_REPORTING_ACTION, reportingListWorker)]);
}

export default reportingSagas;
