import { all, put, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import ApiRoutes from '../../core/ApiRoutes';
import { ADD_PHARMACIE, MANAGE_PHARMACIE_RESPONSE } from './add/constants';
import { manageAddPharmacieResponse } from './add/actions';
import { addPharmacieToStore } from '../App/actions';

function* addPharmacieWorker(action) {
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
      ApiRoutes.PHARMACIES,
      manageAddPharmacieResponse,
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

function* manageCreatePharmacieResponseWorker(action) {
  const { payload, callback } = action;
  if (payload && payload.id) {
    yield put(addPharmacieToStore(payload));
  }
  if (callback) {
    callback(payload);
  }
}

function* addPharmacieSaga() {
  yield all([
    takeLatest(ADD_PHARMACIE, addPharmacieWorker),
    takeLatest(MANAGE_PHARMACIE_RESPONSE, manageCreatePharmacieResponseWorker),
  ]);
}

export default addPharmacieSaga;
