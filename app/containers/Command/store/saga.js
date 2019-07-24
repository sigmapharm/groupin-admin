import { all, put, takeLatest } from 'redux-saga/effects';
import {
  DELETE_COMMAND,
  DISPATCH_QUANTITY_TO_SUB_COMMANDS,
  DOWNLOAD_COMMAND_FORM,
  LOAD_AGGREGATE_SUB_COMMANDS,
  LOAD_COMMAND_ARTICLES,
  LOAD_COMMANDS_WITH_FILTERS,
  UPDATE_COMMAND_DETAIL,
} from './actions';
import { callApi } from '../../../services/saga';
import {
  deleteCommandSuccess,
  loadAggregateSubCommandsSuccess,
  loadCommandArticlesSuccess,
  loadCommandsSuccess,
  updateCommandDetailSuccess,
  dispatchQuantitySuccess,
} from './actions.creators';
import requestWithAuth from '../../../services/request/request-with-auth';

function* downloadCommandFormWorker({ payload: { commandId, callback } }) {
  const options = {
    method: 'GET',
  };
  try {
    const blob = yield requestWithAuth(
      `/commands/${commandId}/print`,
      options,
      true,
    );
    yield callback && callback(null, blob);
  } catch (e) {
    yield callback && callback(e);
  }
}

function* dispatchQuantityWorker({ payload: { id, callback } }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield requestWithAuth(`/commands/aggregate/${id}/dispatch`, options);
    yield put(dispatchQuantitySuccess());
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
  }
}

function* loadAggregateSubCommandsWorker({ payload: { id, callback } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = yield requestWithAuth(`/commands/aggregate/${id}`, options);
    yield put(loadAggregateSubCommandsSuccess(res));
    // yield callApi(
    //   `/commands/aggregate/${id}`,
    //   loadAggregateSubCommandsSuccess,
    //   options,
    //   null,
    // );
    yield callback && callback();
  } catch (e) {
    console.log("lala");
    yield callback && callback(e);
  }
}

function* updateClientCommandWorker({
  payload: { commandId, commandArticles, callback, isAggregate },
}) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      commandArticles.filter(({ selected }) => selected || isAggregate),
    ),
  };
  try {
    const res = yield requestWithAuth(
      `/commands/${isAggregate ? 'aggregate' : 'client'}/${commandId}`,
      options,
    );
    yield put(updateCommandDetailSuccess(res));
    // yield callApi(
    //   `/commands/${isAggregate ? 'aggregate' : 'client'}/${commandId}`,
    //   updateCommandDetailSuccess,
    //   options,
    //   null,
    // );
    yield callback && callback();
  } catch (e) {}
}

function* loadCommandArticleWorker({ payload: { id, isAggregate, callback } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = yield requestWithAuth(
      `/commands/${isAggregate ? 'aggregate/' : ''}${id}/articles`,
      options,
    );
    yield put(loadCommandArticlesSuccess(res));
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
  }
}

function* deleteCommandWorker({ payload: { id, callback, isAggregate } }) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = yield requestWithAuth(
      `/commands/${isAggregate ? 'aggregate/' : ''}${id}`,
      options,
    );
    yield put(deleteCommandSuccess(res));
    // yield callApi(
    //   `/commands/${isAggregate ? 'aggregate/' : ''}${id}`,
    //   deleteCommandSuccess,
    //   options,
    //   null,
    // );
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
  }
}

function* loadCommandsWorker({
  payload: { offerId, isAggregate, callback, ...payload },
}) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const queryString = Object.keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&');
    console.log("too");
  try {
    const res = yield requestWithAuth(
      `/commands/${isAggregate ? 'aggregate/' : ''}${offerId ||
        ''}?${queryString}`,
      options,
    );
    yield put(loadCommandsSuccess(res));
    // yield callApi(
    //   `/commands/${isAggregate ? 'aggregate/' : ''}${offerId ||
    //     ''}?${queryString}`,
    //   loadCommandsSuccess,
    //   options,
    //   null,
    // );
    yield callback && callback();
  } catch (e) {
    console.log(callback);
    yield callback && callback(e);
  }
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
  ]);
}
