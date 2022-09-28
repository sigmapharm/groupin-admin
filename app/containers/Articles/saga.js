import { takeLatest, all, put } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { getArticleDetailsSuccess, manageCreateArticleResponse, putArticlesList } from './actions';
import ApiRoutes from '../../core/ApiRoutes';
import {
  GET_ARTICLE_DETAILS,
  GET_ARTICLES_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  SUBMIT_CREATE_ARTICLE,
  SUBMIT_DELETE_ARTICLE,
  SUBMIT_IMPORTED_ARTICLES,
} from './constants';
import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';

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
  yield networking(function*() {
    try {
      const { cols } = action.payload;
      const sortQuery = cols
        .filter(({ selected }) => selected == true)
        .reduce((acc, n) => acc.concat(`&sort=${n.colName},${n.order}`), '');
      const params = `?size=${action.payload.rowsPerPage}&page=${action.payload.page}&categorie=${action.payload.categorie}&nom=${
        action.payload.nom
      }&laboratory=${action.payload.laboratoire}${sortQuery}`;
      // yield callApi(`/articles${params}`, putArticlesList, options, null);
      const res = yield requestWithAuth(`/articles${params}`, options);
      yield put(putArticlesList(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
      // eslint-disable-line
    }
  });
}

// Saga artilses of a single Labo

function* deleteArticleworker(action) {
  const { payload, callback } = action;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.ARTICLES}/${payload.articleId}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
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
    yield put(manageCreateArticleResponse(e.response, callback(e)));
    // callback && callback(e)(e.response);
  }
}

//Save Imported
function* importArticlesWorker(action) {
  const {
    payload: { LabId, ArticleList },
    callback,
  } = action;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: LabId,
      list: ArticleList.map(item => ({
        ...item,
        neccissite_prescription: item.neccissite_prescription === '1' ? true : false,
        produit_marche: item.produit_marche === '1' ? true : false,
      })),
    }),
  };

  try {
    const res = yield requestWithAuth(`/laboratoires/${LabId}/importcsv`, options);
    callback && callback(null, res);
    console.log('Callback result :' + res);
  } catch (e) {
    callback && callback(e, null);
    console.log('Callback result :' + JSON.stringify(e.errList));
  }
}

function* manageCreateArticleResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

function* articlesListSagas() {
  yield all([
    takeLatest(GET_ARTICLE_DETAILS, getArticleDetailsWorker),
    takeLatest(GET_ARTICLES_LIST_ACTION, articlesListWorker),
    takeLatest(SUBMIT_CREATE_ARTICLE, addOrUpdateArticleWorker),
    takeLatest(SUBMIT_DELETE_ARTICLE, deleteArticleworker),
    takeLatest(SUBMIT_IMPORTED_ARTICLES, importArticlesWorker),
    takeLatest(MANAGE_CREATE_ARTICLE_RESPONSE, manageCreateArticleResponseWorker),
  ]);
}

export default articlesListSagas;
