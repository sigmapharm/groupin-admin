import { createSelector } from 'reselect';
const offresState = store => store.get('grouping');

export const getAllCommands = () =>
  createSelector(offresState, state => state.get('commands').toJS());
export const getAllArticlesByCommands = () =>
  createSelector(offresState, state => state.get('articles').toJS());

