import { createSelector } from 'reselect';

const pharmaciesAnalyticsState = store => store.get('pharmaciesAnalytics');

export const makeSelectGetAnalyticsList = () => createSelector(pharmaciesAnalyticsState, state => state.get('list').toJS());

export const makeSelectGetLabosAnalyticsList = () =>
  createSelector(pharmaciesAnalyticsState, state => state.get('labosAnalyticsList').toJS());
