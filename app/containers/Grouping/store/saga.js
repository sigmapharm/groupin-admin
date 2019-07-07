import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../../services/saga';
import {
  loadAggregatedArticlesSuccess,
  loadAllCommandByOfferSuccess,
} from './actions.creators';
import {
  CREATE_COMMAND_AGGREGATE,
  LOAD_AGGREGATED_ARTICLES,
  LOAD_ALL_COMMAND_BY_OFFER,
} from './actions';
import { submitClientCommandSuccess } from '../../Offres/actions';

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
  // provider/{offerId}/{providerId}
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
      `/commands/${id}?page=0&size=${Number.MAX_SAFE_INTEGER}`,
      loadAllCommandByOfferSuccess,
      options,
      null,
    );
  } catch (e) {}
}

export default function* groupingListSagas() {
  yield all([
    takeLatest(LOAD_ALL_COMMAND_BY_OFFER, loadAllCommandByOfferWorker),
    takeLatest(LOAD_AGGREGATED_ARTICLES, loadAggregatedArticlesByCommandWorker),
    takeLatest(CREATE_COMMAND_AGGREGATE, submitCommandAggregateWorker),
  ]);
}
