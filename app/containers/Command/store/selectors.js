import { createSelector } from 'reselect';
const offresState = store => store.get('commands');

export const getCommandsList = () =>
  createSelector(offresState, state => state.get('commandsList').toJS());
export const getCommandArticles = () =>
  createSelector(offresState, state => state.get('commandArticlesDetail').toJS());
export const getSubCommands = () =>
  createSelector(offresState, state => state.get('subCommands').toJS());
