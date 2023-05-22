import { all, put, takeLatest } from 'redux-saga/effects';
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
import { loadOfferMetaDataSuccess } from '../../Command/store/actions.creators';
import { LOAD_OFFER_META_DATA } from '../../Command/store/actions';
import * as GlobalActions from '../../App/actions';

function* loadOfferMetaDataWorker({ payload: { offerId, callback } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/offres/${offerId}`, options);
      yield put(loadOfferMetaDataSuccess(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* createNewProviderWorker({ payload, callback }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/provider`, options);
      yield put(createNewProviderSuccess(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* submitCommandAggregateWorker({ payload: { providerId, offerId, commandsId, commandArticleAggregates }, callback }) {
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
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/aggregate/${offerId}`, options);
      yield put(submitClientCommandSuccess(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}
/*
// !! bug in this endpoint
// !! dont forget to change to
function* loadAggregatedArticlesByCommandWorker({ payload: { commandIds = [] } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const queryString = commandIds.map(value => `commandId=${value}`).join('&');
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/articles/aggregate/?${queryString}`, options);
      yield put(loadAggregatedArticlesSuccess(res));
    } catch (e) {}
  });
}*/

function* loadAggregatedArticlesByCommandWorker({ payload: { commandIds = [] } }) {
  const queryString = commandIds.map(value => Number(value));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commandsList: queryString,
    }),
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/articles/aggregate`, options);
      console.log('log response ', res);
      yield put(loadAggregatedArticlesSuccess(res));
    } catch (e) {
      console.log('loadAggregatedArticles request error : ', res);
    }
  });
}

function* loadAllCommandByOfferWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/commands/${id}?size=999999&sort=id,desc`, options);
      yield put(loadAllCommandByOfferSuccess(res));
    } catch (e) {}
  });
}
function* getAllProvidersWorker() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/provider`, options);
      yield put(loadAllProvidersSuccess(res));
      // yield callApi(`/provider`, loadAllProvidersSuccess, options, null);
    } catch (e) {}
  });
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

export default function* groupingListSagas() {
  yield all([
    takeLatest(LOAD_ALL_COMMAND_BY_OFFER, loadAllCommandByOfferWorker),
    takeLatest(LOAD_AGGREGATED_ARTICLES, loadAggregatedArticlesByCommandWorker),
    takeLatest(CREATE_COMMAND_AGGREGATE, submitCommandAggregateWorker),
    takeLatest(CREATE_NEW_PROVIDER, createNewProviderWorker),
    takeLatest([GET_ALL_PROVIDERS, CREATE_NEW_PROVIDER_SUCCESS], getAllProvidersWorker),
    takeLatest(LOAD_OFFER_META_DATA, loadOfferMetaDataWorker),
    ,
  ]);
}
