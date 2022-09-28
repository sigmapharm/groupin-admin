import { createSelector } from 'reselect';

const pharmaciesState = store => store.get('pharmacies');

const makeSelectPharmaciesList = () => createSelector(pharmaciesState, state => state.get('pharmaciesList').toJS());

const makeSelectPage = () => createSelector(pharmaciesState, state => state.get('page'));

const makeSelectRowsPerPage = () => createSelector(pharmaciesState, state => state.get('rowsPerPage'));

const makeSelectDenomination = () => createSelector(pharmaciesState, state => state.get('denomination'));

const makeSelectAdresse = () => createSelector(pharmaciesState, state => state.get('adresse'));

const makeSelectBanque = () => createSelector(pharmaciesState, state => state.get('banque'));

const makeSelectIce = () => createSelector(pharmaciesState, state => state.get('ice'));

const makeSelectFormeJuridique = () => createSelector(pharmaciesState, state => state.get('formeJuridique'));
const makeSelectPatente = () => createSelector(pharmaciesState, state => state.get('patente'));

const selectePharmacieFormData = () => createSelector(pharmaciesState, state => state.get('pharmacieFormData').toJS());

export {
  selectePharmacieFormData,
  makeSelectPharmaciesList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectPatente,
  makeSelectFormeJuridique,
  makeSelectIce,
  makeSelectBanque,
  makeSelectAdresse,
  makeSelectDenomination,
};
