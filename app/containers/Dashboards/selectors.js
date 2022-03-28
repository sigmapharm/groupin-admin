import { createSelector } from 'reselect';
const statisticsState = store => store.get('statistics');

const selectStatistics = () => createSelector(statisticsState, state => state.get('statistics').toJS());

export { selectStatistics };
