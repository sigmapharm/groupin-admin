import { fromJS } from 'immutable';
import _ from 'lodash';
import { GET_STATISTICS_ACTION, PUT_STATISTICS_ACTION } from './constants';

export const formDataInitialState = fromJS({ statistics: {} });

export const initialState = fromJS({ statistics: {} });

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_STATISTICS_ACTION: {
      return state.merge({ ...action.payload });
    }
    case PUT_STATISTICS_ACTION: {
      return state.merge({ statistics: action.payload });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
