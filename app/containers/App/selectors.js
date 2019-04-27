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


const makeSelectLaboratoires = () =>
  createSelector(selectApp, appState => {
    return (appState && appState.toJS().laboratoires) || [];
  });

const makeSelectArticle = () =>
  createSelector(
    selectApp,
    appState => (appState && appState.toJS().article) || null,
  );


const makeSelectVilles = () =>
  createSelector(selectApp, appState => {
    return (appState && appState.toJS().villes) || [];
  });

export {
  makeSelectLocation,
  makeSelectUser,
  makeSelectGlobalLoaderStatus,
  makeSelectPharmacies,
  makeSelectArticle,
  makeSelectLaboratoires,
  makeSelectVilles,
};
