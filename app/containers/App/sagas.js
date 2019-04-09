import { all, put, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {GET_CONFIGURATION, GET_PHARMACIES, GET_REGIONS, GET_VILLES} from './constants';
import ApiRoutes from '../../core/ApiRoutes';
import {
  setNetworkingActive,
  setNetworkingInactive,
  setPharmacies,
  setRegions,
  setVilles,
} from './actions';

function* getPharmaciesWorker() {
  yield callApi(ApiRoutes.PHARMACIES, setPharmacies, {}, null, false, false);
}
function* getRegionsWorker() {
  yield callApi(ApiRoutes.REGIONS, setRegions, {}, null, false, false);
}
function* getVillesWorker() {
  yield callApi(ApiRoutes.VILLES, setVilles, {}, null, false, false);
}

function* getConfigurationWorker() {
  try {
    yield put(setNetworkingActive());
    yield getPharmaciesWorker();
    yield getRegionsWorker();
    yield getVillesWorker();
    yield put(setNetworkingInactive());
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
}

export default function* appSaga() {
  yield all([
    takeLatest(GET_PHARMACIES, getPharmaciesWorker),
    takeLatest(GET_VILLES, getVillesWorker),
    takeLatest(GET_REGIONS, getRegionsWorker),
    takeLatest(GET_CONFIGURATION, getConfigurationWorker),
  ]);
}
