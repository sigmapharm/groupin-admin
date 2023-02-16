import { all, put, takeLatest } from 'redux-saga/effects';
import * as GlobalActions from '../App/actions';

import requestWithAuth from '../../services/request/request-with-auth';
import { ADD_ADS, ADS_LIST, GET_ADS_DETAIL, UPDATE_ADS_DATA, putAdsList, putsAdsData } from './actions';

function* AdsList() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/ads/list`, options, false);

      yield put(putAdsList(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* addAds({ payload: { data, callback } }) {
  const formData = new FormData();

  formData.append('image', data.image[0]);

  const options = {
    method: 'POST',
    body: formData,
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(
        `/ads/create/image?content=${data.content}&start_from=${data.start_from}&end_at=${data.end_at}&link=${data.link}`,
        options,
        false,
      );
      yield callback && callback(res, null);
    } catch (e) {
      yield callback && callback(null, e);
    }
  });
}

function* updateAds({ payload: { data, callback, id, image_path } }) {
  const formData = new FormData();

  formData.append('file', data.image[0]);

  const options = {
    method: 'PUT',
    body: formData,
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(
        `/ads/update/${id}?content=${data.content}&start_from=${data.startFrom ? data.startFrom : ''}&end_at=${
          data.endAt ? data.endAt : ''
        }&link=${data.link}&image_path=${image_path}`,
        options,
        false,
      );
      yield callback && callback(res, null);
    } catch (e) {
      yield callback && callback(null, e);
    }
  });
}

function* adsDetail({ payload: { id } }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  yield networking(function*() {
    try {
      const res = yield requestWithAuth(`/ads/${id}`, options, false);
      yield put(putsAdsData(res));
    } catch (e) {
      console.log(e);
    }
  });
}

function* networking(func) {
  yield put(GlobalActions.setNetworkingActive());
  yield func();
  yield put(GlobalActions.setNetworkingInactive());
}

export default function* AdsListSagas() {
  yield all([
    takeLatest(ADS_LIST, AdsList),
    takeLatest(ADD_ADS, addAds),
    takeLatest(GET_ADS_DETAIL, adsDetail),
    takeLatest(UPDATE_ADS_DATA, updateAds),
  ]);
}
