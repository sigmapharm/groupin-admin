import { fromJS } from 'immutable';
import _ from 'lodash';
import { GET_ARTICLE_STATS } from './constants';

export const formDataInitialState = fromJS({ stateReport: {} });

export const initialState = fromJS({ stateReport: {} });

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_ARTICLE_STATS: {
      return state.merge({ ...action.payload });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
