import { all, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { GET_USERS_LIST_ACTION } from './constants';
import { putUsersList } from './actions';

function* usersListWorker(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const params = `?size=${action.payload.rowsPerPage}&page=${
      action.payload.page
    }&firstName=${action.payload.prenom}&lastName=${
      action.payload.nom
    }&pharmacie=${action.payload.pharmacie}`;
    yield callApi(`/users${params}`, putUsersList, options, null);
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

function* usersListSagas() {
  yield all([takeLatest(GET_USERS_LIST_ACTION, usersListWorker)]);
}

export default usersListSagas;
