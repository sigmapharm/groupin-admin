import { ADD_PHARMACIE, MANAGE_PHARMACIE_RESPONSE } from './constants';

export const addPharmacie = (values, callback) => ({
  type: ADD_PHARMACIE,
  payload: { ...values },
  callback,
});

export const manageAddPharmacieResponse = (response, callback) => ({
  type: MANAGE_PHARMACIE_RESPONSE,
  payload: { ...response },
  callback,
});
