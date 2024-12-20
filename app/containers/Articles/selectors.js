import { createSelector } from 'reselect';

const articlesState = store => store.get('articles');

const makeSelectArticlesList = () =>
  createSelector(articlesState, state => state.get('articlesList').toJS());

const makeSelectPage = () =>
  createSelector(articlesState, state => state.get('page'));

const makeSelectRowsPerPage = () =>
  createSelector(articlesState, state => state.get('rowsPerPage'));

const makeSelectcategorie = () =>
  createSelector(articlesState, state => state.get('categorie'));

const makeSelectNom = () =>
  createSelector(articlesState, state => state.get('nom'));

const makeSelectPPH = () =>
  createSelector(articlesState, state => state.get('PPH'));

const makeSelectPPV = () =>
  createSelector(articlesState, state => state.get('PPV'));

const makeSelectTVA = () =>
  createSelector(articlesState, state => state.get('TVA'));

const makeSelectlaboratoire = () =>
  createSelector(articlesState, state => state.get('laboratoire'));
const selecteArticleFormData = () =>
  createSelector(articlesState, state => state.get('articleFormData').toJS());

export {
  selecteArticleFormData,
  makeSelectArticlesList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectNom,
  makeSelectcategorie,
  makeSelectPPH,
  makeSelectPPV,
  makeSelectTVA,
  makeSelectlaboratoire,
};
