import {all, put, takeLatest} from 'redux-saga/effects';
import { callApi } from '../../../services/saga';
import {
  createNewProviderSuccess,
  loadAggregatedArticlesSuccess,
  loadAllCommandByOfferSuccess,
  loadAllProvidersSuccess,
} from './actions.creators';
import {
  CREATE_COMMAND_AGGREGATE,
  CREATE_NEW_PROVIDER,
  CREATE_NEW_PROVIDER_SUCCESS,
  GET_ALL_PROVIDERS,
  LOAD_AGGREGATED_ARTICLES,
  LOAD_ALL_COMMAND_BY_OFFER,
} from './actions';
import { submitClientCommandSuccess } from '../../Offres/actions';
import requestWithAuth from '../../../services/request/request-with-auth';
import {loadOfferMetaDataSuccess} from "../../Command/store/actions.creators";
import {LOAD_OFFER_META_DATA} from "../../Command/store/actions";

function* loadOfferMetaDataWorker({ payload: { offerId } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = yield requestWithAuth(`/offres/${offerId}`, options);
    yield put(loadOfferMetaDataSuccess(res));
  } catch (e) {}
}

function* createNewProviderWorker({ payload, callback }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  try {
    yield callApi(`/provider`, createNewProviderSuccess, options, null);
    yield callback();
  } catch (e) {}
}

function* submitCommandAggregateWorker({
  payload: { providerId, offerId, commandsId, commandArticleAggregates },
  callback,
}) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commandsId,
      providerId,
      commandArticleAggregates,
    }),
  };
  try {
    yield callApi(
      `/commands/aggregate/${offerId}`,
      submitClientCommandSuccess,
      options,
      null,
    );
    yield callback();
  } catch (e) {}
}

function* loadAggregatedArticlesByCommandWorker({
  payload: { commandIds = [] },
}) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const queryString = commandIds.map(value => `commandId=${value}`).join('&');
  try {
    yield callApi(
      `/commands/articles/aggregate/?${queryString}`,
      loadAggregatedArticlesSuccess,
      options,
      null,
    );
  } catch (e) {}
}

function* loadAllCommandByOfferWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      `/commands/${id}?page=0&size=${Number.MAX_SAFE_INTEGER}&sort=id,desc`,
      loadAllCommandByOfferSuccess,
      options,
      null,
    );
  } catch (e) {}
}
function* getAllProvidersWorker() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(`/provider`, loadAllProvidersSuccess, options, null);
  } catch (e) {}
}

export default function* groupingListSagas() {
  yield all([
    takeLatest(LOAD_ALL_COMMAND_BY_OFFER, loadAllCommandByOfferWorker),
    takeLatest(LOAD_AGGREGATED_ARTICLES, loadAggregatedArticlesByCommandWorker),
    takeLatest(CREATE_COMMAND_AGGREGATE, submitCommandAggregateWorker),
    takeLatest(CREATE_NEW_PROVIDER, createNewProviderWorker),
    takeLatest(
      [GET_ALL_PROVIDERS, CREATE_NEW_PROVIDER_SUCCESS],
      getAllProvidersWorker,
    ),
    takeLatest(LOAD_OFFER_META_DATA,loadOfferMetaDataWorker)
  ]);
}