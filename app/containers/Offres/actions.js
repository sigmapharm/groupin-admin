import {
  GET_OFFRES_LIST_ACTION, MANAGE_CREATE_OFFRE_RESPONSE,
  PUT_OFFRES_LIST_ACTION, SUBMIT_CREATE_OFFRE,

} from './constants';


const getOffreList = values => ({
  type: GET_OFFRES_LIST_ACTION,
  payload: { ...values },
});

const putOffresList = values => ({
  type:  PUT_OFFRES_LIST_ACTION,
  payload: { ...values },
});


const manageCreateOffreResponse = (response, callback) => ({
  type:MANAGE_CREATE_OFFRE_RESPONSE,
  payload: { ...response },
  callback,
});

 const createOffre = (formData, callback) => ({
  type:   SUBMIT_CREATE_OFFRE,
  payload: { ...formData },
  callback,
});


export {getOffreList,putOffresList,manageCreateOffreResponse,createOffre};
