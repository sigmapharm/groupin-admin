import { createSelector } from 'reselect';

const offresState = store => store.get('offres');


const makeSelectOffresList = () =>
  createSelector(offresState, state => state.get('offresList').toJS());

const makeSelectPage = () =>
  createSelector(offresState, state => state.get('page'));

const makeSelectRowsPerPage = () =>
  createSelector(offresState, state => state.get('rowsPerPage'));

const makeSelectdesignation = () =>
  createSelector(offresState, state => state.get('designation'));

const makeSelectdateDebut = () =>
  createSelector(offresState, state => state.get('dateDebut'));

const makeSelectdateFin= () =>
  createSelector(offresState, state => state.get('dateFin'));

const makeSelectmontantObjectif = () =>
  createSelector(offresState, state => state.get('montantObjectif'));

const makeSelectquantiteMinimale = () =>
  createSelector(offresState, state => state.get('quantiteMinimale'));

const makeSelectstatus = () =>
  createSelector(offresState, state => state.get('status'));

const makeSelectlaboratoire = () =>
  createSelector(offresState, state => state.get('laboratoire'));




export {
  makeSelectOffresList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectdesignation,
  makeSelectdateDebut,
  makeSelectdateFin,
  makeSelectmontantObjectif,
  makeSelectquantiteMinimale,
  makeSelectstatus,
  makeSelectlaboratoire,
};

