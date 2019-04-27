import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { GET_ARTICLES_LIST_ACTION, MANAGE_CREATE_ARTICLE_RESPONSE, SUBMIT_CREATE_ARTICLE } from './constants';
import { manageCreateArticleResponse, putArticlesList } from './actions';
import ApiRoutes from '../../core/ApiRoutes';
import ARTICLES from '../../core/ApiRoutes';

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
    }&categorie=${
      action.payload.categorie }&nom=${action.payload.nom}&PPH=${action.payload.PPH}&PPV=${action.payload.PPV}&laboratoire=${action.payload.laboratoire}&TVA=${action.payload.TVA}`;
    yield callApi(`/articles${params}`, putArticlesList, options, null);
  } catch (e) {
    console.log(e);
    // eslint-disable-line
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
      ApiRoutes.ARTICLES,manageCreateArticleResponse,
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

function*  manageCreateArticleResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}



function* articlesListSagas() {
  yield all([takeLatest(GET_ARTICLES_LIST_ACTION, articlesListWorker),
    takeLatest(SUBMIT_CREATE_ARTICLE, addNewArticleWorker),
    takeLatest(MANAGE_CREATE_ARTICLE_RESPONSE, manageCreateArticleResponseWorker),


  ]);

}

export default articlesListSagas;
