import { takeLatest, all, put } from 'redux-saga/effects';
import { callApi } from '../../services/saga';
import { manageCreateProviderResponse, putProvidersList, putProviderFormData } from './actions';
import ApiRoutes from '../../core/ApiRoutes';
import {
  GET_PROVIDER_DETAILS,
  GET_PROVIDERS_LIST_ACTION,
  MANAGE_CREATE_PROVIDER_RESPONSE,
  SUBMIT_CREATE_PROVIDER,
  SUBMIT_DELETE_PROVIDER,
} from './constants';
import requestWithAuth from '../../services/request/request-with-auth';
import * as GlobalActions from '../App/actions';

// TODO : optimize options http header later ;)

function* getProviderDetailsWorker({ payload: { id } }) {
  console.log('id', id);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    yield callApi(`/provider/${id}`, putProviderFormData, options, null);
  } catch (e) {
    // eslint-disable-line
  }
}

function* providersListWorker(action) {
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
        .filter(({ selected }) => selected)
        .reduce((acc, n) => acc.concat(`&sort=${n.colName},${n.order}`), '');
      const params = `?size=${action.payload.rowsPerPage}&page=${action.payload.page}&fullName=${action.payload.fullName}&phone=${
        action.payload.phone
      }&cityName=${action.payload.cityName}${sortQuery}`;
      const res = yield requestWithAuth(`/provider/list${params}`, options);
      yield put(putProvidersList(res));
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
      // eslint-disable-line
    }
  });
}

function* deleteProviderworker(action) {
  const { payload, callback } = action;
  console.log('payload', payload);

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  yield networking(function*() {
    try {
      yield requestWithAuth(`${ApiRoutes.PROVIDER}/${payload.providerId}`, options);
      yield callback && callback();
    } catch (e) {
      yield callback && callback(e);
    }
  });
}

function* addOrUpdateProviderWorker(action) {
  const {
    payload: { providerId, ...payload },
    callback,
  } = action;
  const options = {
    method: providerId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
    }),
  };

  try {
    yield callApi(
      `${ApiRoutes.PROVIDER}${providerId ? `/${providerId}` : ''}`,
      manageCreateProviderResponse,
      options,
      null,
      false,
      false,
      callback && callback(),
    );
  } catch (e) {
    yield put(manageCreateProviderResponse(e.response, callback(e)));
    // callback && callback(e)(e.response);
  }
}

function* manageCreateProviderResponseWorker(action) {
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

function* providerListSagas() {
  yield all([
    takeLatest(GET_PROVIDER_DETAILS, getProviderDetailsWorker),
    takeLatest(GET_PROVIDERS_LIST_ACTION, providersListWorker),
    takeLatest(SUBMIT_CREATE_PROVIDER, addOrUpdateProviderWorker),
    takeLatest(SUBMIT_DELETE_PROVIDER, deleteProviderworker),
    takeLatest(MANAGE_CREATE_PROVIDER_RESPONSE, manageCreateProviderResponseWorker),
  ]);
}

export default providerListSagas;
