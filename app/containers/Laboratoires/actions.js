import {
  CHANGE_LABORATOIRE_FORM_DATA,
  CLEAR_LABORATOIRE_FORM,
  GET_LABORATOIRE_DETAILS_SUCCESS,
  GET_LABORATOIRES_LIST_ACTION,
  MANAGE_CREATE_LABORATOIRE_RESPONSE,
  PUT_LABORATOIRES_LIST_ACTION,
  SUBMIT_CREATE_LABORATOIRE,
  SUBMIT_DELETE_LABORATOIRE,
  GET_LABORATOIRE_DETAILS,
  PUT_LABORATOIRE_FORM_DATA,
} from './constants';

const getLaboratoiresList = (values, callback) => ({
  type: GET_LABORATOIRES_LIST_ACTION,
  payload: { ...values, callback },
});

const putLaboratoiresList = values => ({
  type: PUT_LABORATOIRES_LIST_ACTION,
  payload: { ...values },
});

const manageCreateLaboratoireResponse = (response, callback) => ({
  type: MANAGE_CREATE_LABORATOIRE_RESPONSE,
  payload: { ...response },
  callback,
});

export const createLaboratoire = (formData, callback) => ({
  type: SUBMIT_CREATE_LABORATOIRE,
  payload: { ...formData },
  callback,
});
export const deleteLaboratoire = (laboratoryId, callback) => ({
  type: SUBMIT_DELETE_LABORATOIRE,
  payload: { laboratoryId },
  callback,
});

const changeLaboratoireFormData = payload => ({
  type: CHANGE_LABORATOIRE_FORM_DATA,
  payload,
});
const putLaboratoireFormData = payload => {
  console.log('action', payload);
  return {
    type: PUT_LABORATOIRE_FORM_DATA,
    payload,
  };
};

const getLaboratoireDetails = ({ id }) => ({
  type: GET_LABORATOIRE_DETAILS,
  payload: { id },
});
const getLaboratoireDetailsSuccess = payload => ({
  type: GET_LABORATOIRE_DETAILS_SUCCESS,
  payload,
});

const clearLaboratoireForm = () => ({
  type: CLEAR_LABORATOIRE_FORM,
});

export {
  clearLaboratoireForm,
  getLaboratoireDetailsSuccess,
  getLaboratoireDetails,
  changeLaboratoireFormData,
  getLaboratoiresList,
  putLaboratoiresList,
  manageCreateLaboratoireResponse,
  putLaboratoireFormData,
};
