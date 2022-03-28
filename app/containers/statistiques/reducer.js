import { fromJS } from 'immutable';
import _ from 'lodash';
import { GET_REPORTING_ACTION, PUT_REPORTING_ACTION } from './constants';

export const formDataInitialState = fromJS({ reporting: {} });

export const initialState = fromJS({ reporting: {} });

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_REPORTING_ACTION: {
      return state.merge({ ...action.payload });
    }
    case PUT_REPORTING_ACTION: {
      return state.merge({ reporting: action.payload });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
