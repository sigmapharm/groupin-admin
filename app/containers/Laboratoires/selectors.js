import { createSelector } from 'reselect';

const laboratoiresState = store => store.get('laboratoires');

const makeSelectLaboratoiresList = () => createSelector(laboratoiresState, state => state.get('laboratoiresList').toJS());

const makeSelectPage = () => createSelector(laboratoiresState, state => state.get('page'));

const makeSelectRowsPerPage = () => createSelector(laboratoiresState, state => state.get('rowsPerPage'));

const makeSelectnom = () => createSelector(laboratoiresState, state => state.get('nom'));

const makeSelectEmail = () => createSelector(laboratoiresState, state => state.get('email'));

const makeSelectWebsite = () => createSelector(laboratoiresState, state => state.get('website'));

const makeSelectDescription = () => createSelector(laboratoiresState, state => state.get('description'));

const makeSelectAdresse = () => createSelector(laboratoiresState, state => state.get('adresse'));

const selecteLaboratoireFormData = () => createSelector(laboratoiresState, state => state.get('laboratoireFormData').toJS());

export {
  selecteLaboratoireFormData,
  makeSelectLaboratoiresList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectnom,
  makeSelectDescription,
  makeSelectWebsite,
  makeSelectEmail,
  makeSelectAdresse,
};
