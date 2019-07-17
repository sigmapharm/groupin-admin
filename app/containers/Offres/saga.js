import { all, put, takeLatest } from 'redux-saga/effects';
import {
  CLONE_OFFER,
  CLONE_OFFER_SUCCESS,
  CLOSE_OFFER,
  CLOSE_OFFER_SUCCESS,
  DELETE_OFFER,
  DELETE_OFFER_SUCCESS,
  GET_OFFER_WITH_DETAILS,
  GET_OFFRES_LIST_ACTION,
  LOAD_ARTICLES_OFFER,
  MANAGE_CREATE_OFFRE_RESPONSE,
  SUBMIT_CLIENT_COMMAND,
  SUBMIT_CREATE_OFFRE,
} from './constants';
import {
  cloneOfferFail,
  cloneOfferSuccess,
  closeOfferSuccess,
  deleteOfferSuccess,
  getOfferWithDetailsSuccess,
  loadArticleOfferSuccess,
  manageCreateOffreResponse,
  putOffresList,
  submitClientCommandSuccess,
} from './actions';
import { callApi } from '../../services/saga';
import { GET_LABO_ARTICLES_LIST_ACTION } from '../App/constants';
import { putArticleslaboList } from '../App/actions';
import requestWithAuth from '../../services/request/request-with-auth';

function* cloneOfferWorker({ payload: { offerId, filters, callback } }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield requestWithAuth(`/offres/${offerId}/clone`, options);
    yield put(cloneOfferSuccess(filters));
    yield callback && callback();
  } catch (e) {
    yield put(cloneOfferFail());
    yield callback && callback(e);
  }
}

function* closeOfferWorker({ payload: { offerId, filters, callback } }) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield requestWithAuth(`/offres/${offerId}/close`, options);
    yield put(closeOfferSuccess(filters));
    yield callback && callback();
  } catch (e) {
    yield callback && callback(e);
  }
}

function* submitClientCommandWorker(action) {
  const {
    callback,
    payload: { offerArticles, offerId },
  } = action;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      offerArticles
        .filter(({ selected }) => !!selected)
        .map(({ id, quantity }) => ({
          offerArticleId: id,
          quantity: quantity || 0,
        })),
    ),
  };
  try {
    yield requestWithAuth(`/commands/client/${offerId}`, options);
    yield put(submitClientCommandSuccess());
    yield callback && callback();
  } catch (e) {
    // TODO
  }
}

function* getOfferWithDetailsWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = yield requestWithAuth(`/offres/${id}/full-details`, options);
    yield put(getOfferWithDetailsSuccess(res));
  } catch (e) {
    // TODO
  }
}

function* deleteOfferWorker({ payload: { id, filters } }) {
  const options = {
    method: 'DELETE',
  };
  try {
    yield requestWithAuth(`/offres/${id}`, options);
    yield put(deleteOfferSuccess(filters));
  } catch (e) {
    // TODO
  }
}

function* loadArticleOfferWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = yield requestWithAuth(`/offres/${id}/articles`, options);
    yield put(loadArticleOfferSuccess(res));

    /* yield callApi(
      `/offres/${id}/articles`,
      loadArticleOfferSuccess,
      options,
      null,
    );
    */
  } catch (e) {
    // TODO
  }
}

function* offresListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?size=${action.payload.rowsPerPage}&page=${
      action.payload.page
    }&designation=${action.payload.designation}&laboratory=${
      action.payload.laboratoire
    }&status=${action.payload.status}`;
    yield callApi(`/offres${params}`, putOffresList, options, null);
  } catch (e) {
    console.log(e);
    // eslint-disable-line
  }
}

function* addNewOffreWorker(action) {
  const {
    payload: {
      offerArticledtos,
      offerId,
      laboratoryId,
      laboratoire,
      updateOnlyDate,
      ...payload
    },
    callback,
  } = action;

  const options = {
    method: offerId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      offerArticledtos: updateOnlyDate
        ? []
        : offerArticledtos.map(({ selected, id, discount, minQuantity }) => ({
          articleId: id,
          discount,
          selected,
          minQuantity,
        })),
    }),
  };
  try {
    yield callApi(
      updateOnlyDate
        ? `/offres/${offerId}/extend-end-date`
        : `/offres/${laboratoryId}${offerId ? `/${offerId}` : ''}`,
      manageCreateOffreResponse,
      options,
      null,
      false,
      false,
      callback,
    );
  } catch (e) {
    callback(null);
  }
}

function* manageCreateArticleResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* laboArticlesListWorker(action) {
  const { payload } = action;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      `/laboratoires/${payload.value}/articles`,
      putArticleslaboList,
      options,
      null,
    );
  } catch (e) {
    alert(e); // eslint-disable-line
  }
}

function* offersListSagas() {
  yield all([
    takeLatest(
      [
        GET_OFFRES_LIST_ACTION,
        DELETE_OFFER_SUCCESS,
        CLOSE_OFFER_SUCCESS,
        CLONE_OFFER_SUCCESS,
      ],
      offresListWorker,
    ),
    takeLatest(SUBMIT_CREATE_OFFRE, addNewOffreWorker),
    takeLatest(GET_LABO_ARTICLES_LIST_ACTION, laboArticlesListWorker),
    takeLatest(MANAGE_CREATE_OFFRE_RESPONSE, manageCreateArticleResponseWorker),
    takeLatest(LOAD_ARTICLES_OFFER, loadArticleOfferWorker),
    takeLatest(DELETE_OFFER, deleteOfferWorker),
    takeLatest(GET_OFFER_WITH_DETAILS, getOfferWithDetailsWorker),
    takeLatest(SUBMIT_CLIENT_COMMAND, submitClientCommandWorker),
    takeLatest(CLOSE_OFFER, closeOfferWorker),
    takeLatest(CLONE_OFFER, cloneOfferWorker),
  ]);
}

export default offersListSagas;
