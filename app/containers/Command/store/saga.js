import {all, put, takeLatest} from 'redux-saga/effects';
import {
  DELETE_COMMAND,
  DISPATCH_QUANTITY_TO_SUB_COMMANDS,
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

function* dispatchQuantityWorker({ payload: { id, callback } }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield requestWithAuth(`/commands/aggregate/${id}/dispatch`, options);
    /* yield callApi(
      `/commands/aggregate/${id}/dispatch`,
      dispatchQuantitySuccess,
      options,
      null,
    ); */
    yield put(dispatchQuantitySuccess());
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
  }
}

function* loadAggregateSubCommandsWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      `/commands/aggregate/${id}`,
      loadAggregateSubCommandsSuccess,
      options,
      null,
    );
  } catch (e) {}
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
    yield callApi(
      `/commands/${isAggregate ? 'aggregate' : 'client'}/${commandId}`,
      updateCommandDetailSuccess,
      options,
      null,
    );
    yield callback && callback();
  } catch (e) {}
}

function* loadCommandArticleWorker({ payload: { id, isAggregate } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      `/commands/${isAggregate ? 'aggregate/' : ''}${id}/articles`,
      loadCommandArticlesSuccess,
      options,
      null,
    );
  } catch (e) {}
}

function* deleteCommandWorker({ payload: { id, callback, isAggregate } }) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      `/commands/${isAggregate ? 'aggregate/' : ''}${id}`,
      deleteCommandSuccess,
      options,
      null,
    );
    yield callback && callback();
  } catch (e) {}
}

function* loadCommandsWorker({
  payload: { offerId, isAggregate, ...payload },
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
  try {
    yield callApi(
      `/commands/${isAggregate ? 'aggregate/' : ''}${offerId ||
        ''}?${queryString}`,
      loadCommandsSuccess,
      options,
      null,
    );
  } catch (e) {}
}

export default function* commandListSagas() {
  yield all([
    takeLatest(LOAD_COMMANDS_WITH_FILTERS, loadCommandsWorker),
    takeLatest(DELETE_COMMAND, deleteCommandWorker),
    takeLatest(LOAD_COMMAND_ARTICLES, loadCommandArticleWorker),
    takeLatest(UPDATE_COMMAND_DETAIL, updateClientCommandWorker),
    takeLatest(LOAD_AGGREGATE_SUB_COMMANDS, loadAggregateSubCommandsWorker),
    takeLatest(DISPATCH_QUANTITY_TO_SUB_COMMANDS, dispatchQuantityWorker),
  ]);
}
