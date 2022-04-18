import { fromJS } from 'immutable';
import decode from 'jwt-decode';
import {
  PUT_USERS_LIST_ACTION,
  GET_USERS_LIST_ACTION,
  SUBMIT_UPDATE_USER,
  PUT_USER_PROFILE,
  GET_USER_INFO,
  PUT_USER_INFO,
} from './constants';

import AccessTokenStorage from '../../services/security/AccessTokenStorage';

export const initialState = fromJS({
  usersList: [],
  page: 0,
  rowsPerPage: 10,
  userProfil: {},
  userInfo: {},
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
      return state.merge({ usersList: action.payload });
    }
    case PUT_USER_PROFILE: {
      return state.merge({ userProfil: action.payload });
    }
    case SUBMIT_UPDATE_USER: {
      if (!state.get('user')) {
        const accessToken = AccessTokenStorage.get();
        const parsedToken = decode(accessToken);
        return state.merge({ user: parsedToken.user });
      }
      return state;
    }
    case PUT_USER_INFO: {
      return state.merge({ userInfo: action.payload });
    }

    case GET_USER_INFO: {
      return state.merge({ userInfo: action.payload });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
