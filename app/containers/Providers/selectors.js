import { createSelector } from 'reselect';

const providersState = store => store.get('provider');

const makeSelectProvidersList = () => createSelector(providersState, state => state.get('providersList').toJS());

const makeSelectPage = () => createSelector(providersState, state => state.get('page'));

const makeSelectRowsPerPage = () => createSelector(providersState, state => state.get('rowsPerPage'));

const makeSelectFullName = () => createSelector(providersState, state => state.get('fullName'));

const makeSelectPhone = () => createSelector(providersState, state => state.get('phone'));

const makeSelectFax = () => createSelector(providersState, state => state.get('fax'));

const makeSelectEmail = () => createSelector(providersState, state => state.get('email'));

const makeSelectCityName = () => createSelector(providersState, state => state.get('cityName'));

const selecteProviderFormData = () => createSelector(providersState, state => state.get('providerFormData').toJS());

export {
  selecteProviderFormData,
  makeSelectProvidersList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectFullName,
  makeSelectPhone,
  makeSelectFax,
  makeSelectEmail,
  makeSelectCityName,
};
