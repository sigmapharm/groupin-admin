import { all, put, takeLatest } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import {
  GET_CONFIGURATION,
  GET_PHARMACIES,
  GET_REGIONS,
  GET_VILLES,
  GET_LABORATOIRES,
} from './constants';
import ApiRoutes from '../../core/ApiRoutes';
import {
  setNetworkingActive,
  setNetworkingInactive,
  setPharmacies,
  setRegions,
  setVilles,
  setLaboratoires,
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

function* getLaboratoiresWorker() {
  yield callApi(
    ApiRoutes.LABORATOIRES,
    setLaboratoires,
    {},
    null,
    false,
    false,
  );
}

function* getConfigurationWorker() {
  try {
    yield put(setNetworkingActive());
    yield getPharmaciesWorker();
    yield getRegionsWorker();
    //yield getVillesWorker();
    yield getLaboratoiresWorker();
    yield put(setNetworkingInactive());
  } catch (e) {

    // eslint-disable-line
  }
}

function* appSaga() {
  yield all([
    takeLatest(GET_PHARMACIES, getPharmaciesWorker),
    //takeLatest(GET_VILLES, getVillesWorker),
    takeLatest(GET_REGIONS, getRegionsWorker),
    takeLatest(GET_LABORATOIRES, getLaboratoiresWorker),
    takeLatest(GET_CONFIGURATION, getConfigurationWorker),
  ]);
}

export default appSaga;
