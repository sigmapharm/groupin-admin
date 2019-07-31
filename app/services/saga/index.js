import { put } from 'redux-saga/effects';
import requestWithAuth from '../request/request-with-auth';
import * as GlobalActions from '../../containers/App/actions';

const defaultOptions = {
  method: 'GET',
  headers: {},
};

/**
 * @param url : string
 * @param callbackAction : function
 * @param options
 * @param formatDataFunction : function
 * @param isSetNetworkingActive : boolean
 * @param isSetNetworkingInactive : boolean
 * @param callbackParams : array
 * @returns {IterableIterator<*>}
 */
function* callApi(
  url,
  callbackAction,
  options = defaultOptions,
  formatDataFunction,
  isSetNetworkingActive = true,
  isSetNetworkingInactive = true,
  callbackParams = null,
) {
  if (isSetNetworkingActive) {
    yield put(GlobalActions.setNetworkingActive());
  }
  try {
    let rawData = null;
    rawData = yield requestWithAuth(url, options);
    const formattedData = formatDataFunction
      ? formatDataFunction(rawData)
      : rawData;
    if (callbackAction) {
      yield put(callbackAction(formattedData, callbackParams));
    }
  } catch (e) {
    // TODO put some error handling here (show notifications ?)
    throw e;
  } finally {
    if (isSetNetworkingInactive) {
      yield put(GlobalActions.setNetworkingInactive());
    }
  }
}

export { callApi };
