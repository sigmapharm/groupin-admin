import { all, put, takeLatest } from 'redux-saga/effects';
import ApiRoutes from '../../core/ApiRoutes';
import { addLaboratoireToStore } from '../App/actions';
import { manageAddlaboratoireResponse } from './add/actions';
import { callApi } from '../../services/saga';
import { ADD_LABORATOIRE, MANAGE_LABORATOIRE_RESPONSE } from './add/constants';

function* addLaboratoireWorker(action) {
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
      ApiRoutes.LABORATOIRES,
      manageAddlaboratoireResponse,
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

function* manageCreateLaboratoireResponseWorker(action) {
  const { payload, callback } = action;
  if (payload && payload.id) {
    yield put(addLaboratoireToStore(payload));
  }
  if (callback) {
    callback(payload);
  }
}

function* addLaboratoireSaga() {
  yield all([
    takeLatest(ADD_LABORATOIRE, addLaboratoireWorker),
    takeLatest(
      MANAGE_LABORATOIRE_RESPONSE,
      manageCreateLaboratoireResponseWorker,
    ),
  ]);
}

export default addLaboratoireSaga;
