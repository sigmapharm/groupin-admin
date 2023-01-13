import { createSelector } from 'reselect';

const alertsState = store => store.get('alerts');

export const makeSelectAlertsList = () => createSelector(alertsState, state => state.get('alertsList').toJS());
export const makeSelectList = () => createSelector(alertsState, state => state.get('list').toJS());
export const makeSelectgetActiveAlert = () => createSelector(alertsState, state => state.get('activeAlert').toJS());
