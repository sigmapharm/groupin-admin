import { all, takeLatest } from 'redux-saga/effects';
import {
  DELETE_OFFER,
  DELETE_OFFER_SUCCESS,
  GET_OFFER_WITH_DETAILS,
  GET_OFFRES_LIST_ACTION,
  LOAD_ARTICLES_OFFER,
  MANAGE_CREATE_OFFRE_RESPONSE,
  SUBMIT_CLIENT_COMMAND,
  SUBMIT_CLIENT_COMMAND_SUCCESS,
  SUBMIT_CREATE_OFFRE,
} from './constants';
import {
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

function* submitClientCommandWorker(action) {
  console.log(action);
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
    yield callApi(
      `/commands/client/${offerId}`,
      submitClientCommandSuccess,
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

function* getOfferWithDetailsWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(`/offres/${id}/`, getOfferWithDetailsSuccess, options, null);
  } catch (e) {
    console.log({ e });
  }
}

function* deleteOfferWorker({ payload: { id, filters } }) {
  const options = {
    method: 'DELETE',
  };
  yield callApi(
    `/offres/${id}`,
    deleteOfferSuccess.bind(null, filters),
    options,
    null,
  );
}

function* loadArticleOfferWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      `/offres/${id}/articles`,
      loadArticleOfferSuccess,
      options,
      null,
    );
  } catch (e) {
    console.log({ e });
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
      offerArticledtos: offerArticledtos.map(({ selected, id, discount }) => ({
        articleId: id,
        discount,
        selected,
      })),
    }),
  };
  try {
    yield callApi(
      `/offres/${laboratoryId}${offerId ? `/${offerId}` : ''}`,
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
function* submitClientCommandSuccessWorker(action) {
  console.log(action);
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

function* offresListSagas() {
  yield all([
    takeLatest(
      [GET_OFFRES_LIST_ACTION, DELETE_OFFER_SUCCESS],
      offresListWorker,
    ),
    takeLatest(SUBMIT_CREATE_OFFRE, addNewOffreWorker),
    takeLatest(GET_LABO_ARTICLES_LIST_ACTION, laboArticlesListWorker),
    takeLatest(MANAGE_CREATE_OFFRE_RESPONSE, manageCreateArticleResponseWorker),
    takeLatest(LOAD_ARTICLES_OFFER, loadArticleOfferWorker),
    takeLatest(DELETE_OFFER, deleteOfferWorker),
    takeLatest(GET_OFFER_WITH_DETAILS, getOfferWithDetailsWorker),
    takeLatest(SUBMIT_CLIENT_COMMAND, submitClientCommandWorker),
    takeLatest(SUBMIT_CLIENT_COMMAND_SUCCESS, submitClientCommandSuccessWorker),
  ]);
}

export default offresListSagas;
