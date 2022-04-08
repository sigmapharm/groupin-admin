import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  GET_ARTICLE_STATS,
  PUT_REPORTING_ACTION,
  GET_PHARMA_STATS,
  PUT_PHARMA_STATS,
  GET_LABOS_STATS,
  PUT_LABOS_STATS,
  GET_CITY_STATS,
  PUT_CITY_STATS,
  GET_PRINT_PHRAMA_STATS,
  PUT_PRINT_PHRAMA_STATS,
} from './constants';

export const formDataInitialState = fromJS({ stateReport: {} });

export const initialState = fromJS({ articlesStats: {}, pharmaStats: {}, labosStats: {}, cityStats: {}, pharmaPrint: {} });

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case PUT_REPORTING_ACTION: {
      return state.merge({ articlesStats: action.payload });
    }

    case GET_ARTICLE_STATS: {
      return state.merge({ ...action.payload });
    }

    case GET_PHARMA_STATS: {
      return state.merge({ ...action.payload });
    }

    case PUT_PHARMA_STATS: {
      return state.merge({ pharmaStats: action.payload });
    }

    case GET_LABOS_STATS: {
      return state.merge({ ...action.payload });
    }

    case PUT_LABOS_STATS: {
      return state.merge({ labosStats: action.payload });
    }

    case GET_CITY_STATS: {
      return state.merge({ ...action.payload });
    }

    case PUT_CITY_STATS: {
      return state.merge({ cityStats: action.payload });
    }

    case GET_PRINT_PHRAMA_STATS: {
      return state.merge({ ...action.payload });
    }

    case PUT_PRINT_PHRAMA_STATS: {
      return state.merge({ pharmaPrint: action.payload });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
