import { fromJS } from 'immutable';
import { DISPLAY_LOGIN_ERROR, MANAGE_LOGIN_RESPONSE } from './constants';

export const initialState = fromJS({
  error: false,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case DISPLAY_LOGIN_ERROR: {
      return state.merge({
        error: true,
      });
    }
    case MANAGE_LOGIN_RESPONSE: {
      return state.merge({
        error: false,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
