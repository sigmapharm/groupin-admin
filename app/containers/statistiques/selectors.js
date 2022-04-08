import { createSelector } from 'reselect';
const reportingState = store => store.get('articlesStats');

const selectArticles = () => createSelector(reportingState, state => state.get('articlesStats').toJS());

const selectPharmas = () => createSelector(reportingState, state => state.get('pharmaStats').toJS());

const selectlabos = () => createSelector(reportingState, state => state.get('labosStats').toJS());

const selectCity = () => createSelector(reportingState, state => state.get('cityStats').toJS());

const selectPrintPharma = () => createSelector(reportingState, state => state.get('pharmaPrint'));

export { selectArticles, selectPharmas, selectlabos, selectCity, selectPrintPharma };
