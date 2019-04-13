import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { GET_ARTICLES_LIST_ACTION } from './constants';
import { putArticlesList } from './actions';

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
      action.payload.categorie }&nom=${action.payload.nom}&PPH=${action.payload.PPH}&PPV=${action.payload.PPV}
     &TVA=${action.payload.TVA}`;
    yield callApi(`/articles${params}`, putArticlesList, options, null);
  } catch (e) {
    console.log(e);
    // eslint-disable-line
  }
}

function* articlesListSagas() {
  yield all([takeLatest(GET_ARTICLES_LIST_ACTION, articlesListWorker)]);
}

export default articlesListSagas;
