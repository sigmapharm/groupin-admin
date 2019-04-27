import { ADD_LABORATOIRE, MANAGE_LABORATOIRE_RESPONSE } from './constants';


export const addlaboratoire = (values, callback) => ({
  type: ADD_LABORATOIRE,
  payload: { ...values },
  callback,
});

export const   manageAddlaboratoireResponse = (response, callback) => ({
  type: MANAGE_LABORATOIRE_RESPONSE,
  payload: { ...response },
  callback,
});
