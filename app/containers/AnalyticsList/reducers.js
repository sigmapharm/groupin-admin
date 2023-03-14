import { fromJS } from 'immutable';
import _ from 'lodash';
import { PUT_LABOS_ANALYTICS, PUT_PAHRAMCIES_ANALYTICS } from './actions';

export const initialState = fromJS({
  list: [],
  labosAnalyticsList: [],
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case PUT_PAHRAMCIES_ANALYTICS: {
      return state.merge({
        list: action.payload,
      });
    }

    case PUT_LABOS_ANALYTICS: {
      return state.merge({
        labosAnalyticsList: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
