import { createSelector } from 'reselect';
import _ from 'lodash';

const selectRouter = state => state.get('router');
const selectApp = state => state.get('global');

const makeSelectGlobalLoaderStatus = () => createSelector(selectApp, appState => appState.toJS().loader);

const makeSelectLocation = () => createSelector(selectRouter, routerState => routerState.get('location').toJS());

const makeSelectPharmacies = () => createSelector(selectApp, appState => (appState && appState.toJS().pharmacies) || []);

const makeSelectUser = () => createSelector(selectApp, appState => (appState && appState.toJS().user) || null);

const makeSelectLaboratoires = () => createSelector(selectApp, appState => (appState && appState.toJS().laboratoires) || []);

const selectRegions = () => createSelector(selectApp, appState => (appState && appState.toJS().regions) || []);

const selectCities = () =>
  createSelector(selectApp, appState => _.flatMap(_.map((appState && appState.toJS().regions) || [], 'cities')));

export {
  selectRegions,
  makeSelectLocation,
  makeSelectUser,
  makeSelectGlobalLoaderStatus,
  makeSelectPharmacies,
  makeSelectLaboratoires,
  selectCities,
};
