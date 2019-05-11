/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const SET_USER_IN_STORE = 'app/global/SET_USER_IN_STORE';
export const RESET_USER_IN_STORE = 'app/global/RESET_USER_IN_STORE';
export const SET_NETWORKING_ACTIVE = 'app/global/SET_NETWORKING_ACTIVE';
export const SET_NETWORKING_INACTIVE = 'app/global/SET_NETWORKING_INACTIVE';
export const LOGOUT = 'app/global/LOGOUT';

export const GET_CONFIGURATION = 'app/global/GET_CONFIGURATION';

export const GET_PHARMACIES = 'app/global/GET_PHARMACIES';
export const GET_VILLES = 'app/global/GET_VILLES';
export const GET_REGIONS = 'app/global/GET_REGIONS';
export const SET_PHARMACIES = 'app/global/SET_PHARMACIES';
export const ADD_NEW_PHARMACIE_TO_STORE = 'app/global/ADD_NEW_PHARMACIE_TO_STORE';
export const SET_VILLES = 'app/global/SET_VILLES';
export const SET_REGIONS = 'app/global/SET_REGIONS';
export const SET_ARTICLE_IN_STORE = 'app/global/SET_ARTICLE_IN_STORE';
export const RESET_ARTICLE_IN_STORE = 'app/global/RESET_ARTICLE_IN_STORE';
export const ADD_NEW_LABORATOIRE_TO_STORE = 'app/global/ADD_NEW_LABORATOIRE_TO_STORE';
export const GET_LABORATOIRES = 'app/global/GET_LABORATOIRES';
export const SET_LABORATOIRES = 'app/global/SET_LABORATOIRES';

//


