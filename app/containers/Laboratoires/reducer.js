import { fromJS } from 'immutable';
import {
  PUT_LABORATOIRE_FORM_DATA,
  CHANGE_LABORATOIRE_FORM_DATA,
  CLEAR_LABORATOIRE_FORM,
  GET_LABORATOIRES_LIST_ACTION,
  GET_LABORATOIRE_DETAILS_SUCCESS,
  MANAGE_CREATE_LABORATOIRE_RESPONSE,
  PUT_LABORATOIRES_LIST_ACTION,
  GET_LABORATOIRE_FORM_DATA,
} from './constants';
import _ from 'lodash';

const laboratoireFormDataInitialState = fromJS({
  fullName: '',
  phone: '',
  fax: '',
  email: '',
  cityName: '',
});

export const initialState = fromJS({
  laboratoireFormData: laboratoireFormDataInitialState.toJS(),
  laboratoiresList: [],
  laboratoireFormData: {},
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_LABORATOIRES_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_LABORATOIRES_LIST_ACTION: {
      return state.merge({
        laboratoiresList: action.payload,
      });
    }

    case CHANGE_LABORATOIRE_FORM_DATA: {
      const laboratoireFormData = state.get('laboratoireFormData').toJS();
      return state.merge({
        laboratoireFormData: _.merge(laboratoireFormData, action.payload),
      });
    }
    case GET_LABORATOIRE_DETAILS_SUCCESS: {
      const formData = action.payload;
      return state.merge({
        laboratoireFormData: formData,
      });
    }
    case PUT_LABORATOIRE_FORM_DATA: {
      const formData = action.payload;
      return state.merge({
        laboratoireFormData: formData,
      });
    }
    case GET_LABORATOIRE_FORM_DATA: {
      const formData = action.payload;
      return state.merge({
        laboratoireFormData: formData,
      });
    }
    case MANAGE_CREATE_LABORATOIRE_RESPONSE:
    case CLEAR_LABORATOIRE_FORM: {
      const laboratoireFormData = laboratoireFormDataInitialState.toJS();
      return state.merge({
        laboratoireFormData,
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
