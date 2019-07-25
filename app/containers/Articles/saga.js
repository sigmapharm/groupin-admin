import { takeLatest, all, put } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {
  deleteArticle,
  getArticleDetailsSuccess,
  manageCreateArticleResponse,
  putArticlesList,
} from './actions';
import ApiRoutes from '../../core/ApiRoutes';
import {
  GET_ARTICLE_DETAILS,
  GET_ARTICLES_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  SUBMIT_CREATE_ARTICLE,
  SUBMIT_DELETE_ARTICLE,
} from './constants';
import requestWithAuth from '../../services/request/request-with-auth';

// TODO : optimize options http header later ;)

function* getArticleDetailsWorker({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(`/articles/${id}`, getArticleDetailsSuccess, options, null);
  } catch (e) {
    // eslint-disable-line
  }
}

function* articlesListWorker(action) {
  const { callback } = action.payload;
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
    // yield callApi(`/articles${params}`, putArticlesList, options, null);
    const res = yield requestWithAuth(`/articles${params}`, options);
    yield put(putArticlesList(res));
    yield callback && callback();
  } catch (e) {
    console.log("test callback");
    yield callback && callback(e);
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

function* addOrUpdateArticleWorker(action) {
  const {
    payload: { articleId, ...payload },
    callback,
  } = action;
  const options = {
    method: articleId ? 'PUT' : 'POST',
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
      `${ApiRoutes.ARTICLES}${articleId ? `/${articleId}` : ''}`,
      manageCreateArticleResponse,
      options,
      null,
      false,
      false,
      callback && callback(),
    );
  } catch (e) {
    yield put(manageCreateArticleResponse(e.response,callback(e)))
    //callback && callback(e)(e.response);
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
    takeLatest(GET_ARTICLE_DETAILS, getArticleDetailsWorker),
    takeLatest(GET_ARTICLES_LIST_ACTION, articlesListWorker),
    takeLatest(SUBMIT_CREATE_ARTICLE, addOrUpdateArticleWorker),
    takeLatest(SUBMIT_DELETE_ARTICLE, deleteArticleworker),
    takeLatest(
      MANAGE_CREATE_ARTICLE_RESPONSE,
      manageCreateArticleResponseWorker,
    ),
  ]);
}

export default articlesListSagas;
