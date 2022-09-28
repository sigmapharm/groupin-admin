import {
  CHANGE_PROVIDER_FORM_DATA,
  CLEAR_PROVIDER_FORM,
  GET_PROVIDER_DETAILS_SUCCESS,
  GET_PROVIDERS_LIST_ACTION,
  MANAGE_CREATE_PROVIDER_RESPONSE,
  PUT_PROVIDERS_LIST_ACTION,
  SUBMIT_CREATE_PROVIDER,
  SUBMIT_DELETE_PROVIDER,
  GET_PROVIDER_DETAILS,
  PUT_PROVIDER_FORM_DATA,
} from './constants';

const getProvidersList = (values, callback) => ({
  type: GET_PROVIDERS_LIST_ACTION,
  payload: { ...values, callback },
});

const putProvidersList = values => ({
  type: PUT_PROVIDERS_LIST_ACTION,
  payload: { ...values },
});

const manageCreateProviderResponse = (response, callback) => ({
  type: MANAGE_CREATE_PROVIDER_RESPONSE,
  payload: { ...response },
  callback,
});

export const createProvider = (formData, callback) => ({
  type: SUBMIT_CREATE_PROVIDER,
  payload: { ...formData },
  callback,
});
export const deleteProvider = (providerId, callback) => ({
  type: SUBMIT_DELETE_PROVIDER,
  payload: { providerId },
  callback,
});

const changeProviderFormData = payload => ({
  type: CHANGE_PROVIDER_FORM_DATA,
  payload,
});
const putProviderFormData = payload => {
  console.log('action', payload);
  return {
    type: PUT_PROVIDER_FORM_DATA,
    payload,
  };
};

const getProviderDetails = ({ id }) => ({
  type: GET_PROVIDER_DETAILS,
  payload: { id },
});
const getProviderDetailsSuccess = payload => ({
  type: GET_PROVIDER_DETAILS_SUCCESS,
  payload,
});

const clearProviderForm = () => ({
  type: CLEAR_PROVIDER_FORM,
});

export {
  clearProviderForm,
  getProviderDetailsSuccess,
  getProviderDetails,
  changeProviderFormData,
  getProvidersList,
  putProvidersList,
  manageCreateProviderResponse,
  putProviderFormData,
};
