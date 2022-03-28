import { all, put, takeLatest } from 'redux-saga/effects';
import { GET_STATISTICS_ACTION } from './constants';
import { putStatistics } from './actions';

import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';
function* offresListWorker(action) {
  const { callback, userRole } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const endpoint = userRole === 'MEMBRE' ? '/statistics/member' : '/statistics';
      const res = yield requestWithAuth(endpoint, options);
      yield put(putStatistics(res));
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

function* statisticsSagas() {
  yield all([takeLatest(GET_STATISTICS_ACTION, offresListWorker)]);
}

export default statisticsSagas;
