/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from 'containers/App/reducer';
import loginReducer from 'containers/Login/reducer';
import usersReducer from 'containers/Users/reducer';
import articlesReducer from 'containers/Articles/reducer';
import offresReducer from 'containers/Offres/reducer';
import commandsReducer from 'containers/Command/store/reducer';
import groupingReducer from 'containers/Grouping/store/reducer';
import statisticsReducer from 'containers/statistics/reducer';
import reportingReducer from 'containers/Reporting/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    ...injectedReducers,
    global: globalReducer,
    login: loginReducer,
    users: usersReducer,
    articles: articlesReducer,
    offres: offresReducer,
    commands: commandsReducer,
    grouping: groupingReducer,
    statistics: statisticsReducer,
    reporting: reportingReducer,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
