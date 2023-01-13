export const ADD_ALERT = 'ALERT/ADD';
export const CHANGE_ALERT_FORM_DATA = 'ALERT/CHANGE_DATA';
export const ALERT_LIST = 'ALERT/ALERT_LIST';
export const PUT_ALERT_LIST = 'ALERT/PUT_LIST';
export const GET_ACTIVE_ALERT = 'ALERT/GET_ACTIVE_ALERT';
export const PUT_ACTIVE_ALERT = 'ALERT/PUT_ACTIVE_ALERT';
export const UPDATE_ALERT = 'ALERT/UPDATE_ALERT';
export const createAlert = payload => ({
  type: ADD_ALERT,
  payload,
});

export const changeAlertdata = payload => ({
  type: CHANGE_ALERT_FORM_DATA,
  payload,
});

export const getALertsList = payload => ({
  type: ALERT_LIST,
  payload,
});

export const putAlertList = payload => ({
  type: PUT_ALERT_LIST,
  payload,
});

export const getActiveAlert = payload => ({
  type: GET_ACTIVE_ALERT,
  payload,
});

export const putActiveALert = payload => ({
  type: PUT_ACTIVE_ALERT,
  payload,
});

export const updateALert = payload => ({
  type: UPDATE_ALERT,
  payload,
});
