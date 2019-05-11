import { fromJS } from 'immutable';
import { PUT_OFFRES_LIST_ACTION, GET_OFFRES_LIST_ACTION} from './constants';

export const initialState = fromJS({
  offresList: [],
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_OFFRES_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_OFFRES_LIST_ACTION: {
      return state.merge({
        offresList: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
