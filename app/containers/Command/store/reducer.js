import { fromJS } from 'immutable';
import {
  CHANGE_COMMAND_ARTICLE,
  CLEAR_AGGREGATE_SUB_COMMANDS,
  CLEAR_COMMAND_ARTICLES,
  COPY_QUANTITIES_INTO_MODIFIED_QUANTITES,
  LOAD_AGGREGATE_SUB_COMMANDS,
  LOAD_AGGREGATE_SUB_COMMANDS_SUCCESS,
  LOAD_COMMAND_ARTICLES_SUCCESS,
  DISPATCH_QUANTITY_TO_SUB_COMMANDS_CANCEL,
  LOAD_COMMANDS_WITH_FILTERS_SUCCESS,
  UPDATE_COMMAND_DETAIL_SUCCESS,
  GET_DOWNLOAD_FACTURE_FORM,
  PUT_DOWNLOAD_FACTURE_FORM,
} from './actions';
import _ from 'lodash';

export const initialState = fromJS({
  commandsList: {
    content: [],
    totalElements: 0,
    size: 10,
    number: 0,
  },
  commandArticlesDetail: [],
  subCommands: [],
  facturePdf: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMANDS_WITH_FILTERS_SUCCESS: {
      return state.merge({
        commandsList: action.payload,
      });
    }
    case LOAD_COMMAND_ARTICLES_SUCCESS: {
      return state.merge({
        commandArticlesDetail: action.payload,
      });
    }
    case COPY_QUANTITIES_INTO_MODIFIED_QUANTITES: {
      const commandArticlesDetail = state.get('commandArticlesDetail').toJS();
      return state.merge({
        commandArticlesDetail: commandArticlesDetail.map(({ quantity, modifiedQuantity, ...e }) => ({
          ...e,
          quantity,
          modifiedQuantity: quantity,
        })),
      });
    }
    case UPDATE_COMMAND_DETAIL_SUCCESS:
    case CLEAR_COMMAND_ARTICLES: {
      return state.merge({
        commandArticlesDetail: [],
      });
    }
    case LOAD_AGGREGATE_SUB_COMMANDS_SUCCESS: {
      return state.merge({ subCommands: action.payload });
    }
    case CLEAR_AGGREGATE_SUB_COMMANDS: {
      return state.merge({
        subCommands: [],
      });
    }
    case GET_DOWNLOAD_FACTURE_FORM: {
      return state.merge({
        ...action.payload,
      });
    }
    case PUT_DOWNLOAD_FACTURE_FORM: {
      return state.merge({
        facturePdf: action.payload,
      });
    }
    case CHANGE_COMMAND_ARTICLE: {
      const commandArticlesDetail = state.get('commandArticlesDetail').toJS();
      const { index, ...payload } = action.payload;
      return state.merge({
        commandArticlesDetail: _.merge(commandArticlesDetail, {
          [index]: payload,
        }),
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
