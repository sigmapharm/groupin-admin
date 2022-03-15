import { createSelector } from 'reselect';
const reportingState = store => store.get('reporting');

const selectReporting = () =>
  createSelector(reportingState, state => state.get('reporting').toJS());

export { selectReporting };
