import { fromJS } from 'immutable';
import { PUT_USERS_LIST_ACTION, GET_USERS_LIST_ACTION } from './constants';

export const initialState = fromJS({
  usersList: [],
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_USERS_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_USERS_LIST_ACTION: {
      return state.merge({
        usersList: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
