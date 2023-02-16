export const ADS_LIST = 'ADS/LIST';
export const PUT_ADS_LIST = 'PUT_ADS/LIST';
export const ADD_ADS = 'ADD/ADS';
export const CHANGE_ADS_FORM_DATA = 'ADS/DATA';
export const GET_ADS_DETAIL = 'GET_ADS/DATA';
export const FILL_ADS_INPUT = 'FILL_ADS/DATA';
export const PUTS_ADS_DATA = 'PUTS_ADS_DATA/DATA';

export const UPDATE_ADS_DATA = 'UPDATE_ADS_DATA/DATA';

export const getAdsList = payload => ({
  type: ADS_LIST,
  payload,
});

export const putAdsList = payload => ({
  type: PUT_ADS_LIST,
  payload: { ...payload },
});

export const createAds = payload => ({
  type: ADD_ADS,
  payload: { ...payload },
});

export const changeAdsdata = payload => ({
  type: CHANGE_ADS_FORM_DATA,
  payload,
});

export const fillAdsInput = payload => ({
  type: CHANGE_ADS_FORM_DATA,
  payload,
});

export const getAdsData = payload => ({
  type: GET_ADS_DETAIL,
  payload,
});

export const putsAdsData = payload => ({
  type: PUTS_ADS_DATA,
  payload,
});

export const updateAdsData = payload => ({
  type: UPDATE_ADS_DATA,
  payload,
});
