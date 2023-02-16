import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  ADD_ADS,
  ADS_LIST,
  CHANGE_ADS_FORM_DATA,
  FILL_ADS_INPUT,
  GET_ADS_DETAIL,
  PUTS_ADS_DATA,
  PUT_ADS_LIST,
  UPDATE_ADS_DATA,
} from './actions';

export const initialState = fromJS({
  adsList: [],
  addAds: {
    content: '',
    endAt: '',
    link: '',
    startFrom: '',
    image: '',
  },
  updateAds: {},
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case ADS_LIST: {
      return state.merge({
        adsList: action.payload || [],
        addAds: {},
      });
    }
    case PUT_ADS_LIST: {
      return state.merge({
        adsList: action.payload || [],
      });
    }
    case ADD_ADS: {
      return state.merge({
        addAds: action.payload,
      });
    }

    case GET_ADS_DETAIL: {
      return state.merge({
        addAds: action.payload,
      });
    }

    case FILL_ADS_INPUT: {
      return state.merge({
        addAds: action.payload,
      });
    }

    case PUTS_ADS_DATA: {
      return state.merge({
        addAds: action.payload,
      });
    }

    case UPDATE_ADS_DATA: {
      return state.merge({
        updateAds: action.payload,
      });
    }

    case CHANGE_ADS_FORM_DATA: {
      const adsListFormData = state.get('addAds').toJS();
      return state.merge({
        addAds: _.merge(adsListFormData, action.payload),
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
