import { createSelector } from 'reselect';
const reportingState = store => store.get('reporting');

const selectReporting = () => createSelector(reportingState, state => state.get('reporting').toJS());

const selectReportingPdf = () => createSelector(reportingState, state => state.get('reportingPdf'));

const selectReportingCA = () => createSelector(reportingState, state => state.get('reportingCa'));

export { selectReporting, selectReportingPdf, selectReportingCA };
