import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectApp = state => state.get('global');

const makeSelectGlobalLoaderStatus = () =>
  createSelector(selectApp, appState => appState.toJS().loader);

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectPharmacies = () =>
  createSelector(selectApp, appState => {
    return (appState && appState.toJS().pharmacies) || [];
  });

const makeSelectUser = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().user) || null,
  );

export {
  makeSelectLocation,
  makeSelectUser,
  makeSelectGlobalLoaderStatus,
  makeSelectPharmacies,
};
