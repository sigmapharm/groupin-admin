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
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().pharmacies) || [],
  );

const makeSelectUser = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().user) || null,
  );

const makeSelectLaboratoires = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().laboratoires) || [],
  );

const makeSelectVilles = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().villes) || [],
  );

const makeSelectoffreArticledtos = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().articledtos) || [],
  );
const makeSelectarticlesListlabo = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().articlesListlabo) || [],
  );

export {
  makeSelectLocation,
  makeSelectUser,
  makeSelectGlobalLoaderStatus,
  makeSelectPharmacies,
  makeSelectLaboratoires,
  makeSelectVilles,
  makeSelectoffreArticledtos,
  makeSelectarticlesListlabo,
};
