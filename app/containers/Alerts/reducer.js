import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  ADD_ALERT,
  ALERT_LIST,
  CHANGE_ALERT_FORM_DATA,
  FILL_INPUTS,
  GET_ACTIVE_ALERT,
  PUT_ACTIVE_ALERT,
  PUT_ALERT_LIST,
  UPDATE_ALERT,
} from './actions';

export const initialState = fromJS({
  alertsList: {
    is_active: '',
    message: '',
    date_start: '',
    date_end: '',
    alert_type: '',
    link: '',
  },
  list: [],
  activeAlert: {},
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case ADD_ALERT: {
      return state.merge({
        alertsList: action.payload,
      });
    }

    case ALERT_LIST: {
      return state.merge({
        list: action.payload || [],
      });
    }

    case PUT_ALERT_LIST: {
      return state.merge({
        list: action.payload || [],
      });
    }

    case UPDATE_ALERT: {
      return state.merge({
        alertsList: action.payload || [],
      });
    }

    case FILL_INPUTS: {
      return state.merge({
        alertsList: action.payload || [],
      });
    }

    case GET_ACTIVE_ALERT: {
      return state.merge({
        activeAlert: action.payload || {},
      });
    }

    case PUT_ACTIVE_ALERT: {
      return state.merge({
        activeAlert: action.payload || {},
      });
    }

    case CHANGE_ALERT_FORM_DATA: {
      const alertsListFormData = state.get('alertsList').toJS();
      return state.merge({
        alertsList: _.merge(alertsListFormData, action.payload),
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
