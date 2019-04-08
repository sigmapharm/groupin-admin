import { createSelector } from 'reselect';

const usersState = store => store.get('users');

const makeSelectUsersList = () =>
  createSelector(usersState, state => state.get('usersList').toJS());

const makeSelectPage = () =>
  createSelector(usersState, state => state.get('page'));

const makeSelectRowsPerPage = () =>
  createSelector(usersState, state => state.get('rowsPerPage'));

const makeSelectPrenom = () =>
  createSelector(usersState, state => state.get('prenom'));

const makeSelectNom = () =>
  createSelector(usersState, state => state.get('nom'));

const makeSelectPharmacie = () =>
  createSelector(usersState, state => state.get('pharmacie'));

export {
  makeSelectUsersList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectPrenom,
  makeSelectNom,
  makeSelectPharmacie,
};
