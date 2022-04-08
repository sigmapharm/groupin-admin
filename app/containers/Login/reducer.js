import { fromJS } from 'immutable';
import { DISPLAY_LOGIN_ERROR, MANAGE_LOGIN_RESPONSE, GET_EMAIL_RESET, PUT_EMAIL_RESET } from './constants';

export const initialState = fromJS({
  error: false,
  email: '',
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
    case GET_EMAIL_RESET: {
      return state.merge(action.payload);
    }
    case PUT_EMAIL_RESET: {
      return state.merge({
        email: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
