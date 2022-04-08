import { createSelector } from 'reselect';

const loginState = store => store.get('login');

const makeSelectLoginErrors = () => createSelector(loginState, state => state.get('error'));

const makeSelectLoginEmail = () => createSelector(loginState, state => state.get('email'));

export { makeSelectLoginErrors, makeSelectLoginEmail };
