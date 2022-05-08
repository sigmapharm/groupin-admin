import { all, put, takeLatest } from 'redux-saga/effects';
import {
  DELETE_COMMAND,
  DISPATCH_QUANTITY_TO_SUB_COMMANDS,
  DOWNLOAD_COMMAND_FORM,
  LOAD_AGGREGATE_SUB_COMMANDS,
  LOAD_COMMAND_ARTICLES,
  LOAD_COMMANDS_WITH_FILTERS,
  UPDATE_COMMAND_DETAIL,
  GET_DOWNLOAD_FACTURE_FORM,
} from './actions';
import {
  deleteCommandSuccess,
  loadAggregateSubCommandsSuccess,
  loadCommandArticlesSuccess,
  loadCommandsSuccess,
  updateCommandDetailSuccess,
  dispatchQuantitySuccess,
} from './actions.creators';
import requestWithAuth from '../../../services/request/request-with-auth';
import * as GlobalActions from '../../App/actions';

function* downloadCommandFormWorker({ payload: { commandId, callback } }) {
  const options = {
    method: 'GET',
  };
  yield networking(function*() {
    try {
      const blob = yield requestWithAuth(`/commands/${commandId}/print`, options, true);
      yield callback && callback(null, blob);
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* downloadFactureWorker({ payload: { commandId, callback } }) {
  const options = {
    method: 'GET',
  };
  yield networking(function*() {
    try {
      const blob = yield requestWithAuth(`/commands/${commandId}/printFacture`, options, true);
      yield callback && callback(null, blob);
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* dispatchQuantityWorker({ payload: { id, callback } }) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const req = yield requestWithAuth(`/commands/aggregate/${id}/status`, options);
      yield put(loadCommandsSuccess(req));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* loadAggregateSubCommandsWorker({ payload: { id, callback } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/aggregate/${id}`, options);
      yield put(loadAggregateSubCommandsSuccess(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* updateClientCommandWorker({ payload: { commandId, commandArticles, callback, isAggregate } }) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commandArticles.filter(({ selected }) => selected || isAggregate)),
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/${isAggregate ? 'aggregate' : 'client'}/${commandId}`, options);
      yield put(updateCommandDetailSuccess(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(err);
    }
  });
}

function* loadCommandArticleWorker({ payload: { id, isAggregate, callback } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/${isAggregate ? 'aggregate/' : ''}${id}/articles`, options);
      yield put(loadCommandArticlesSuccess(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* deleteCommandWorker({ payload: { id, callback, isAggregate } }) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/${isAggregate ? 'aggregate/' : ''}${id}`, options);
      yield put(deleteCommandSuccess(res));

      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* loadCommandsWorker({ payload: { offerId, cols, isAggregate, callback, ...payload } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const sortQuery = cols.filter(({ selected }) => selected).reduce((acc, n) => acc.concat(`&sort=${n.colName},${n.order}`), '');
  const queryString = Object.keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&');
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(
        `/commands/${isAggregate ? 'aggregate/' : ''}${offerId || ''}?${queryString}${sortQuery}`,
        options,
      );
      yield put(loadCommandsSuccess(res));

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

export default function* commandListSagas() {
  yield all([
    takeLatest(DOWNLOAD_COMMAND_FORM, downloadCommandFormWorker),
    takeLatest(LOAD_COMMANDS_WITH_FILTERS, loadCommandsWorker),
    takeLatest(DELETE_COMMAND, deleteCommandWorker),
    takeLatest(LOAD_COMMAND_ARTICLES, loadCommandArticleWorker),
    takeLatest(UPDATE_COMMAND_DETAIL, updateClientCommandWorker),
    takeLatest(LOAD_AGGREGATE_SUB_COMMANDS, loadAggregateSubCommandsWorker),
    takeLatest(DISPATCH_QUANTITY_TO_SUB_COMMANDS, dispatchQuantityWorker),
    takeLatest(GET_DOWNLOAD_FACTURE_FORM, downloadFactureWorker),
  ]);
}
