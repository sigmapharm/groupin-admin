import { fromJS } from 'immutable';
import {
  PUT_PROVIDER_FORM_DATA,
  CHANGE_PROVIDER_FORM_DATA,
  CLEAR_PROVIDER_FORM,
  GET_PROVIDERS_LIST_ACTION,
  GET_PROVIDER_DETAILS_SUCCESS,
  MANAGE_CREATE_PROVIDER_RESPONSE,
  PUT_PROVIDERS_LIST_ACTION,
} from './constants';
import _ from 'lodash';

const providerFormDataInitialState = fromJS({
  fullName: '',
  phone: '',
  fax: '',
  email: '',
  cityName: '',
});

export const initialState = fromJS({
  providerFormData: providerFormDataInitialState.toJS(),
  providersList: [],
  providerFormData: {},
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_PROVIDERS_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_PROVIDERS_LIST_ACTION: {
      return state.merge({
        providersList: action.payload,
      });
    }

    case CHANGE_PROVIDER_FORM_DATA: {
      const providerFormData = state.get('providerFormData').toJS();
      return state.merge({
        providerFormData: _.merge(providerFormData, action.payload),
      });
    }
    case GET_PROVIDER_DETAILS_SUCCESS: {
      const formData = action.payload;
      return state.merge({
        providerFormData: formData,
      });
    }
    case PUT_PROVIDER_FORM_DATA: {
      const formData = action.payload;
      return state.merge({
        providerFormData: formData,
      });
    }
    case MANAGE_CREATE_PROVIDER_RESPONSE:
    case CLEAR_PROVIDER_FORM: {
      const providerFormData = providerFormDataInitialState.toJS();
      return state.merge({
        providerFormData,
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
