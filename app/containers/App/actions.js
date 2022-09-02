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
  SET_ARTICLE_IN_STORE,
  SET_LABORATOIRES,
  ADD_NEW_LABORATOIRE_TO_STORE,
  GET_LABO_ARTICLES_LIST_ACTION,
  PUT_ARTICLESLABO_LIST_ACTION,
  GET_PROVIDER_DETAILS_SUCCESS,
  GET_PROVIDERS_LIST_ACTION,
  PUT_PROVIDERS_LIST_ACTION,
  GET_PROVIDER_DETAILS,
  GET_LABORATOIRE_DETAILS_SUCCESS,
  GET_LABORATOIRES_LIST_ACTION,
  PUT_LABORATOIRES_LIST_ACTION,
  GET_LABORATOIRE_DETAILS,
  GET_PHARMACIE_DETAILS_SUCCESS,
  GET_PHARMACIE_DETAILS,
  PUT_PHARMACIES_LIST_ACTION,
  GET_PHARMACIES_LIST_ACTION,
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

export const setRegions = values => {
  console.log('reg', values);
  return {
    type: SET_REGIONS,
    payload: values,
  };
};

export const setVilles = values => ({
  type: SET_VILLES,
  payload: values,
});

export const addPharmacieToStore = pharmacie => ({
  type: ADD_NEW_PHARMACIE_TO_STORE,
  payload: { ...pharmacie },
});

export const setArticleInStore = () => ({
  type: SET_ARTICLE_IN_STORE,
});
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

export const getLaboArticlesList = laboratoire => ({
  type: GET_LABO_ARTICLES_LIST_ACTION,
  payload: { ...laboratoire },
});

export const putArticleslaboList = values => ({
  type: PUT_ARTICLESLABO_LIST_ACTION,
  payload: values,
});

export const getProvidersList = (values, callback) => ({
  type: GET_PROVIDERS_LIST_ACTION,
  payload: { ...values, callback },
});

export const putProvidersList = values => ({
  type: PUT_PROVIDERS_LIST_ACTION,
  payload: { ...values },
});

export const getProviderDetails = ({ id }) => ({
  type: GET_PROVIDER_DETAILS,
  payload: { id },
});
export const getProviderDetailsSuccess = payload => ({
  type: GET_PROVIDER_DETAILS_SUCCESS,
  payload,
});

export const getLaboratoiresList = (values, callback) => ({
  type: GET_LABORATOIRES_LIST_ACTION,
  payload: { ...values, callback },
});

export const putLaboratoiresList = values => ({
  type: PUT_LABORATOIRES_LIST_ACTION,
  payload: { ...values },
});

export const getLaboratoireDetails = ({ id }) => ({
  type: GET_LABORATOIRE_DETAILS,
  payload: { id },
});
export const getLaboratoireDetailsSuccess = payload => ({
  type: GET_LABORATOIRE_DETAILS_SUCCESS,
  payload,
});
export const getPharnacieDetails = ({ id }) => ({
  type: GET_PHARMACIE_DETAILS,
  payload: { id },
});
export const getPharnacieDetailsSuccess = payload => ({
  type: GET_PHARMACIE_DETAILS_SUCCESS,
  payload,
});
export const getPharmaciesList = (values, callback) => ({
  type: GET_PHARMACIES_LIST_ACTION,
  payload: { ...values, callback },
});

export const putPharmaciesList = values => ({
  type: PUT_PHARMACIES_LIST_ACTION,
  payload: { ...values },
});
