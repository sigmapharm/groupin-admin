import { createSelector } from 'reselect';
const groupingState = store => store.get('grouping');
const globalState = store => store.get('global');

export const getAllCommands = () =>
  createSelector(groupingState, state => state.get('commands').toJS());
export const getAllArticlesByCommands = () =>
  createSelector(groupingState, state => state.get('articles').toJS());
export const getCheckAllValue = () =>
  createSelector(groupingState, state => state.get('checkAll'));

export const getAllProviders = () =>
  createSelector(groupingState, state => state.get('providers').toJS());

export const getAllCities = () =>
  createSelector(globalState, state =>
    _.flatMap(_.map(state.get('regions').toJS() || [], 'cities')),
  );
