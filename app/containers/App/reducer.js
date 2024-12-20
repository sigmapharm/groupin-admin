import { fromJS } from 'immutable';
import decode from 'jwt-decode';
import _ from 'lodash';
import {
  ADD_NEW_PHARMACIE_TO_STORE,
  RESET_USER_IN_STORE,
  SET_NETWORKING_ACTIVE,
  SET_NETWORKING_INACTIVE,
  SET_PHARMACIES,
  SET_REGIONS,
  SET_USER_IN_STORE,
  SET_VILLES,
  ADD_NEW_LABORATOIRE_TO_STORE,
  RESET_ARTICLE_IN_STORE,
  SET_ARTICLE_IN_STORE,
  SET_LABORATOIRES,
} from './constants';
import AccessTokenStorage from '../../services/security/AccessTokenStorage';

export const initialState = fromJS({
  loader: false,
  user: {},
  pharmacies: [],
  villes: [],
  regions: [],
  laboratoires: [],
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
      if (_.isEmpty(state.get('user').toJS())) {
        const accessToken = AccessTokenStorage.get();
        const parsedToken = decode(accessToken);
        return state.merge({
          user: parsedToken.user,
        });
      }
      return state;
    }
    case RESET_USER_IN_STORE: {
      return state.merge({ user: {} });
    }
    case SET_PHARMACIES: {
      return state.merge({ pharmacies: [...action.payload] });
    }
    case SET_VILLES: {
      return state.merge({ villes: [...action.payload] });
    }
    case SET_REGIONS: {
      return state.merge({ regions: [...action.payload] });
    }
    case ADD_NEW_PHARMACIE_TO_STORE: {
      const newPharmacies = state.toJS().pharmacies;
      newPharmacies.push({ ...action.payload });
      return state.merge({ pharmacies: [...newPharmacies] });
    }
    case SET_ARTICLE_IN_STORE: {
      if (!state.get('article')) {
        const accessToken = AccessTokenStorage.get();
        const parsedToken = decode(accessToken);
        return state.merge({
          article: parsedToken.article,
        });
      }
      return state;
    }

    case RESET_ARTICLE_IN_STORE: {
      return state.merge({ article: null });
    }
    case SET_LABORATOIRES: {
      return state.merge({ laboratoires: [...action.payload] });
    }

    case ADD_NEW_LABORATOIRE_TO_STORE: {
      const newLaboratoires = state.toJS().laboratoires;
      newLaboratoires.push({ ...action.payload });
      return state.merge({ laboratoires: [...newLaboratoires] });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
