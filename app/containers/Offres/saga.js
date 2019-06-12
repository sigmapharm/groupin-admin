import { all, takeLatest } from 'redux-saga/effects';
import {
  GET_OFFRES_LIST_ACTION,
  MANAGE_CREATE_OFFRE_RESPONSE,
  SUBMIT_CREATE_OFFRE,
} from './constants';
import { manageCreateOffreResponse, putOffresList } from './actions';
import { callApi } from '../../services/saga';
import ApiRoutes from '../../core/ApiRoutes';
import { GET_ARTICLESLABO_LIST_ACTION } from '../App/constants';
import { putArticleslaboList } from '../App/actions';
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
    }&designation=${action.payload.designation}&laboratoire=${
      action.payload.laboratoire
    }&status=${action.payload.status}`;
    yield callApi(`/offres${params}`, putOffresList, options, null);
  } catch (e) {
    console.log(e);
    // eslint-disable-line
  }
}

function* addNewOffreWorker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
    }),
  };
  try {
    yield callApi(
      ApiRoutes.OFFRES,
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
function* articleslaboListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?laboratoire=${action.payload.formData.laboratoire.label}`;
    yield callApi(
      `/articles/articleslabo${params}`,
      putArticleslaboList,
      options,
      null,
    );
  } catch (e) {
    console.log(e);
  }
}

function* offresListSagas() {
  yield all([
    takeLatest(GET_OFFRES_LIST_ACTION, offresListWorker),
    takeLatest(SUBMIT_CREATE_OFFRE, addNewOffreWorker),
    takeLatest(GET_ARTICLESLABO_LIST_ACTION, articleslaboListWorker),
    takeLatest(MANAGE_CREATE_OFFRE_RESPONSE, manageCreateArticleResponseWorker),
  ]);
}

export default offresListSagas;
