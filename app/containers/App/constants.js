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
