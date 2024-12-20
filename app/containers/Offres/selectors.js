import { createSelector } from 'reselect';
const offresState = store => store.get('offres');
const makeSelectOffresList = () => createSelector(offresState, state => state.get('offresList').toJS());

const selectOfferArticleList = () => createSelector(offresState, state => state.get('offerArticles').toJS());

const makeSelectPage = () => createSelector(offresState, state => state.get('page'));

const makeSelectRowsPerPage = () => createSelector(offresState, state => state.get('rowsPerPage'));

const makeSelectdesignation = () => createSelector(offresState, state => state.get('designation'));

const makeSelectdateDebut = () => createSelector(offresState, state => state.get('dateDebut'));

const makeSelectdateFin = () => createSelector(offresState, state => state.get('dateFin'));

const makeSelectmontantObjectif = () => createSelector(offresState, state => state.get('montantObjectif'));

const makeSelectquantiteMinimale = () => createSelector(offresState, state => state.get('quantiteMinimale'));

const makeSelectstatus = () => createSelector(offresState, state => state.get('status'));
const makeSelectcomment = () => createSelector(offresState, state => state.get('comment'));

const getSelectedAllValue = () => createSelector(offresState, state => state.get('selectedAll'));

const makeSelectlaboratoire = () => createSelector(offresState, state => state.get('laboratoire'));

const makeSelectarticlesListlabo = () => createSelector(offresState, state => state.get('articlesListlabo').toJS());

const selectOfferFormData = () => createSelector(offresState, state => state.get('offerFormData').toJS());

const selectOriginalOfferFormData = () => createSelector(offresState, state => state.get('originalOfferFormData').toJS());
const selectSelectedOffer = () => createSelector(offresState, state => state.get('selectedOffer').toJS());

export {
  getSelectedAllValue,
  selectOriginalOfferFormData,
  selectSelectedOffer,
  selectOfferFormData,
  selectOfferArticleList,
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
  makeSelectarticlesListlabo,
  makeSelectcomment,
};
