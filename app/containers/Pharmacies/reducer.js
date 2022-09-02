import { fromJS } from 'immutable';
import {
  PUT_PHARMACIE_FORM_DATA,
  CHANGE_PHARMACIE_FORM_DATA,
  CLEAR_PHARMACIE_FORM,
  GET_PHARMACIES_LIST_ACTION,
  GET_PHARMACIE_DETAILS_SUCCESS,
  MANAGE_CREATE_PHARMACIE_RESPONSE,
  PUT_PHARMACIES_LIST_ACTION,
  GET_PHARMACIE_FORM_DATA,
} from './constants';
import _ from 'lodash';

const pharmacieFormDataInitialState = fromJS({
  denomination: '',
  adresse: '',
  tel: '',
  gsm: '',
  patente: '',
  numRC: '',
  interlocuteur: '',
  fonction: '',
  formeJuridique: '',
  banque: '',
  dateDemarrage: '',
  dateCreation: '',
  ice: '',
});

export const initialState = fromJS({
  pharmacieFormData: pharmacieFormDataInitialState.toJS(),
  pharmaciesList: [],
  pharmacieFormData: {},
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_PHARMACIES_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_PHARMACIES_LIST_ACTION: {
      return state.merge({
        pharmaciesList: action.payload,
      });
    }

    case CHANGE_PHARMACIE_FORM_DATA: {
      const pharmacieFormData = state.get('pharmacieFormData').toJS();
      return state.merge({
        pharmacieFormData: _.merge(pharmacieFormData, action.payload),
      });
    }
    case GET_PHARMACIE_DETAILS_SUCCESS: {
      const formData = action.payload;
      return state.merge({
        pharmacieFormData: formData,
      });
    }
    case PUT_PHARMACIE_FORM_DATA: {
      const formData = action.payload;
      console.log('state changes', formData);
      return state.merge({
        pharmacieFormData: formData,
      });
    }
    case GET_PHARMACIE_FORM_DATA: {
      const formData = action.payload;
      return state.merge({
        pharmacieFormData: formData,
      });
    }
    case MANAGE_CREATE_PHARMACIE_RESPONSE:
    case CLEAR_PHARMACIE_FORM: {
      const pharmacieFormData = pharmacieFormDataInitialState.toJS();
      return state.merge({
        pharmacieFormData,
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
