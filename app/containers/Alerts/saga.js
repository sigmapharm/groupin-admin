import { all, put, takeLatest } from 'redux-saga/effects';
import * as GlobalActions from '../App/actions';

import requestWithAuth from '../../services/request/request-with-auth';
import { ADD_ALERT, ALERT_LIST, GET_ACTIVE_ALERT, UPDATE_ALERT, putActiveALert, putAlertList } from './actions';
import { AlarmRounded } from '@material-ui/icons';

function* addalert({ payload: { data, callback } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/alerts/create`, options, false);
      yield callback && callback(res, null);
    } catch (e) {
      yield callback && callback(null, e);
    }
  });
}

function* updateAlert({ payload: { data, callback, alertId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/alerts/update/${alertId}`, options, false);
      yield callback && callback(res, null);
    } catch (e) {
      yield callback && callback(null, e);
    }
  });
}

function* alertsList() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/alerts/list`, options, false);
      yield put(putAlertList(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* getActiveAlert() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/alerts/active-alert`, options, false);
      yield put(putActiveALert(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

export default function* AlertsListSagas() {
  yield all([
    takeLatest(ADD_ALERT, addalert),
    takeLatest(ALERT_LIST, alertsList),
    takeLatest(GET_ACTIVE_ALERT, getActiveAlert),
    takeLatest(UPDATE_ALERT, updateAlert),
  ]);
}
