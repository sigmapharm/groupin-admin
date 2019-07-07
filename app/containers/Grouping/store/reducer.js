import { fromJS } from 'immutable';
import {
  LOAD_ALL_COMMAND_BY_OFFER_SUCCESS,
  CHANGE_COMMAND_SELECTION,
  LOAD_AGGREGATED_ARTICLES_SUCCESS,
  CHANGE_AGGREGATED_ARTICLE_QUANTITY,
  CLEAR_GROUPING,
} from './actions';

export const initialState = fromJS({
  commands: [],
  articles: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COMMAND_SELECTION: {
      const commands = state.get('commands').toJS();
      const { index, selected } = action.payload;
      return state.merge({
        commands: _.merge(commands, { [index]: { selected } }),
      });
    }
    case CHANGE_AGGREGATED_ARTICLE_QUANTITY: {
      const articles = state.get('articles').toJS();
      const { index, modifiedQuantity } = action.payload;
      return state.merge({
        articles: _.merge(articles, { [index]: { modifiedQuantity } }),
      });
    }
    case CLEAR_GROUPING: {
      return initialState;
    }
    case LOAD_AGGREGATED_ARTICLES_SUCCESS: {
      return state.merge({
        articles: action.payload,
      });
    }
    case LOAD_ALL_COMMAND_BY_OFFER_SUCCESS: {
      return state.merge({
        commands: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
