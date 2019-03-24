import {
  LOGOUT,
  SET_NETWORKING_ACTIVE,
  SET_NETWORKING_INACTIVE,
  SET_USER_IN_STORE,
  RESET_USER_IN_STORE,
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
