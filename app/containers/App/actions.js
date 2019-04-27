import {
  LOGOUT,
  SET_NETWORKING_ACTIVE,
  SET_NETWORKING_INACTIVE,
  RESET_USER_IN_STORE,
  GET_PHARMACIES,
  GET_LABORATOIRES,
  GET_VILLES,
  GET_REGIONS,
  SET_PHARMACIES,
  SET_REGIONS,
  SET_VILLES,
  SET_USER_IN_STORE,
  GET_CONFIGURATION,
  ADD_NEW_PHARMACIE_TO_STORE,
  RESET_ARTICLE_IN_STORE,
  SET_ARTICLE_IN_STORE, SET_LABORATOIRES, ADD_NEW_LABORATOIRE_TO_STORE,

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

export const addPharmacieToStore = pharmacie => ({
  type: ADD_NEW_PHARMACIE_TO_STORE,
  payload: { ...pharmacie },
});



export const setArticleInStore =()=>(
  {   type:SET_ARTICLE_IN_STORE,

  }
);
export const resetArticleInStore = () => ({
  type: RESET_ARTICLE_IN_STORE,
});

export const getLaboratoires = () => ({
  type: GET_LABORATOIRES,
});
export const setLaboratoires = values => ({
  type: SET_LABORATOIRES,
  payload: values,
});

export const addLaboratoireToStore = laboratoire => ({
  type: ADD_NEW_LABORATOIRE_TO_STORE,
  payload: { ...laboratoire },
});
