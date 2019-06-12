/* eslint-disable no-unused-vars */
import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {
  GET_ARTICLES_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  SUBMIT_CREATE_ARTICLE,
  SUBMIT_DELETE_ARTICLE,
} from './constants';
import {
  manageCreateArticleResponse,
  putArticleslaboList,
  putArticlesList,
  deleteArticle,
} from './actions';
import ApiRoutes from '../../core/ApiRoutes';

function* articlesListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?size=${action.payload.rowsPerPage}&page=${
      action.payload.page
    }&categorie=${action.payload.categorie}&nom=${
      action.payload.nom
    }&laboratoire=${action.payload.laboratoire}`;
    yield callApi(`/articles${params}`, putArticlesList, options, null);
  } catch (e) {
    console.log(e);
    // eslint-disable-line
  }
}
// Saga artilses of a single Labo

function* deleteArticleworker(id) {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-undef
  const { payload, callback } = action;
  const options = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(
      ApiRoutes.ARTICLES,
      deleteArticle,
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

function* addNewArticleWorker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      // ville: null,
      // region: null,
    }),
  };
  try {
    yield callApi(
      ApiRoutes.ARTICLES,
      manageCreateArticleResponse,
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

function* articlesListSagas() {
  yield all([
    takeLatest(GET_ARTICLES_LIST_ACTION, articlesListWorker),
    takeLatest(SUBMIT_CREATE_ARTICLE, addNewArticleWorker),
    takeLatest(SUBMIT_DELETE_ARTICLE, deleteArticleworker),
    takeLatest(
      MANAGE_CREATE_ARTICLE_RESPONSE,
      manageCreateArticleResponseWorker,
    ),
  ]);
}

export default articlesListSagas;
