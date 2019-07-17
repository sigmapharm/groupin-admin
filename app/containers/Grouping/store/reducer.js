import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  LOAD_ALL_COMMAND_BY_OFFER_SUCCESS,
  CHANGE_COMMAND_SELECTION,
  LOAD_AGGREGATED_ARTICLES_SUCCESS,
  CHANGE_AGGREGATED_ARTICLE_QUANTITY,
  CLEAR_GROUPING,
  GET_ALL_PROVIDERS_SUCCESS,
  TOGGLE_CHECK_ALL,
} from './actions';

export const initialState = fromJS({
  commands: [],
  articles: [],
  providers: [],
  checkAll: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHECK_ALL: {
      const commands = state.get('commands').toJS();
      const checkAll = !state.get('checkAll');
      return state.merge({
        checkAll,
        commands: commands.map(cmd =>
          _.merge(cmd, { selected: cmd.isLinked ? false : checkAll }),
        ),
      });
    }
    case CHANGE_COMMAND_SELECTION: {
      const commands = state.get('commands').toJS();
      const { index, selected } = action.payload;
      return state.merge({
        commands: _.merge([], commands, { [index]: { selected } }),
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
        articles: (action.payload || []).map(e =>
          _.merge({}, e, { modifiedQuantity: e.quantity }),
        ),
      });
    }
    case LOAD_ALL_COMMAND_BY_OFFER_SUCCESS: {
      return state.merge({
        commands: action.payload,
      });
    }
    case GET_ALL_PROVIDERS_SUCCESS: {
      return state.merge({
        providers: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
