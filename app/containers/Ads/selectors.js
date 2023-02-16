import { createSelector } from 'reselect';

const adsState = store => store.get('ads');

export const makeSelectAdsList = () => createSelector(adsState, state => state.get('adsList').toJS());

export const makeSelectAdsAdd = () => createSelector(adsState, state => state.get('addAds').toJS());

// export const makeSelectgetAdsDtails = () => createSelector(adsState, state => state.get('addAds').toJS());
