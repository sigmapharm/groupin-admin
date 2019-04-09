import {
  LOGOUT,
  SET_NETWORKING_ACTIVE,
  SET_NETWORKING_INACTIVE,
  RESET_USER_IN_STORE,
  GET_PHARMACIES,
  GET_VILLES,
  GET_REGIONS,
  SET_PHARMACIES,
  SET_REGIONS,
  SET_VILLES,
  SET_USER_IN_STORE,
  GET_CONFIGURATION,
} from './constants';

export const logout = () => ({
  type: LOGOUT,
});

export const resetUserInStore = () => ({
  type: RESET_USER_IN_STORE,
});

export const setNetworkingInactive = () => ({
  type: SET_NETWORKING_INACTIVE,
});

export const setNetworkingActive = () => ({
  type: SET_NETWORKING_ACTIVE,
});

export const setUserInStore = () => ({
  type: SET_USER_IN_STORE,
});

export const getConfiguration = () => ({
  type: GET_CONFIGURATION,
});

export const getPharmacies = () => ({
  type: GET_PHARMACIES,
});

export const getVilles = () => ({
  type: GET_VILLES,
});

export const getRegions = () => ({
  type: GET_REGIONS,
});

export const setPharmacies = values => ({
  type: SET_PHARMACIES,
  payload: values,
});

export const setRegions = values => ({
  type: SET_REGIONS,
  payload: values,
});

export const setVilles = values => ({
  type: SET_VILLES,
  payload: values,
});
