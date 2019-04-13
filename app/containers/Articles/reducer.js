import { fromJS } from 'immutable';
import {
  GET_ARTICLES_LIST_ACTION,
  PUT_ARTICLES_LIST_ACTION,
} from './constants';

export const initialState = fromJS({
  articlesList:[],
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_ARTICLES_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_ARTICLES_LIST_ACTION: {
      return state.merge({
        articlesList: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
