import { createSelector } from 'reselect';
const reportingState = store => store.get('stateReport');

const selectReporting = () => createSelector(reportingState, state => state.get('stateReport').toJS());

export { selectReporting };
