import {
  CHANGE_PHARMACIE_FORM_DATA,
  CLEAR_PHARMACIE_FORM,
  GET_PHARMACIE_DETAILS_SUCCESS,
  GET_PHARMACIES_LIST_ACTION,
  MANAGE_CREATE_PHARMACIE_RESPONSE,
  PUT_PHARMACIES_LIST_ACTION,
  SUBMIT_CREATE_PHARMACIE,
  SUBMIT_DELETE_PHARMACIE,
  GET_PHARMACIE_FORM_DATA,
  PUT_PHARMACIE_FORM_DATA,
} from './constants';

const getPharmaciesList = (values, callback) => ({
  type: GET_PHARMACIES_LIST_ACTION,
  payload: { ...values, callback },
});

const putPharmaciesList = values => ({
  type: PUT_PHARMACIES_LIST_ACTION,
  payload: { ...values },
});

const manageCreatePharmacieResponse = (response, callback) => ({
  type: MANAGE_CREATE_PHARMACIE_RESPONSE,
  payload: { ...response },
  callback,
});

export const createPharmacie = (formData, callback) => ({
  type: SUBMIT_CREATE_PHARMACIE,
  payload: { ...formData },
  callback,
});
export const deletePharmacie = (pharmacyId, callback) => ({
  type: SUBMIT_DELETE_PHARMACIE,
  payload: { pharmacyId },
  callback,
});

const changePharmacieFormData = payload => ({
  type: CHANGE_PHARMACIE_FORM_DATA,
  payload,
});
const putPharmacieFormData = payload => {
  console.log('action', payload);
  return {
    type: PUT_PHARMACIE_FORM_DATA,
    payload,
  };
};

const getPharmacieDetails = ({ id }) => ({
  type: GET_PHARMACIE_FORM_DATA,
  payload: { id },
});
const getPharmacieDetailsSuccess = payload => ({
  type: GET_PHARMACIE_DETAILS_SUCCESS,
  payload,
});

const clearPharmacieForm = () => ({
  type: CLEAR_PHARMACIE_FORM,
});

export {
  clearPharmacieForm,
  getPharmacieDetailsSuccess,
  getPharmacieDetails,
  changePharmacieFormData,
  getPharmaciesList,
  putPharmaciesList,
  manageCreatePharmacieResponse,
  putPharmacieFormData,
};
