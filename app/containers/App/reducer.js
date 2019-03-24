import { fromJS } from 'immutable';
import decode from 'jwt-decode';
import {
  RESET_USER_IN_STORE,
  SET_NETWORKING_ACTIVE,
  SET_NETWORKING_INACTIVE,
  SET_USER_IN_STORE,
} from './constants';
import AccessTokenStorage from '../../services/security/AccessTokenStorage';

export const initialState = fromJS({
  loader: false,
  user: null,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case SET_NETWORKING_ACTIVE: {
      return state.merge({
        loader: true,
      });
    }
    case SET_NETWORKING_INACTIVE: {
      return state.merge({
        loader: false,
      });
    }
    case SET_USER_IN_STORE: {
      if (!state.get('user')) {
        const accessToken = AccessTokenStorage.get();
        const parsedToken = decode(accessToken);
        return state.merge({
          user: parsedToken.user,
        });
      }
      return state;
    }
    case RESET_USER_IN_STORE: {
      return state.merge({ user: null });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
