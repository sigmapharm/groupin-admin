import { GET_OFFRES_LIST_ACTION, MANAGE_CREATE_OFFRE_RESPONSE, SUBMIT_CREATE_OFFRE } from './constants';
import { manageCreateOffreResponse, putOffresList } from './actions';
import { callApi } from '../../services/saga';
import { all, takeLatest } from 'redux-saga/effects';
import ApiRoutes from '../../core/ApiRoutes';
import { putArticleslaboList } from '../Articles/actions';
import { GET_ARTICLESLABO_LIST_ACTION } from '../Articles/constants';





function* offresListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?size=${action.payload.rowsPerPage}&page=${action.payload.page}&designation=${action.payload.designation}&laboratoire=${action.payload.laboratoire}&status=${action.payload.status}`;
    yield callApi(`/offres${params}`,putOffresList, options, null);
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
      ApiRoutes.OFFRES,manageCreateOffreResponse ,
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

function* articleslaboListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?laboratoire=${action.payload.laboratoire}`;
    yield callApi(`/articles/articleslabo${params}`,putArticleslaboList, options, null);
  } catch (e) {
    console.log(e);
    // eslint-disable-line
  }
}

function*  manageCreateArticleResponseWorker(action) {
  const { payload, callback } = action;
  if (callback) {
    callback(payload);
  }
}


function* offresListSagas() {
  yield all([
    takeLatest(GET_OFFRES_LIST_ACTION,offresListWorker),
    takeLatest(GET_ARTICLESLABO_LIST_ACTION,articleslaboListWorker),
    takeLatest(SUBMIT_CREATE_OFFRE,addNewOffreWorker),
    takeLatest(MANAGE_CREATE_OFFRE_RESPONSE,manageCreateArticleResponseWorker),


  ]);
}

export default offresListSagas;
