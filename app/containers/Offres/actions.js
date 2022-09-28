import {
  APPLY_GLOBAL_REMISE_OR_MIN_QT,
  CHANGE_ARTICLE_OFFER,
  CHANGE_OFFER_ARTICLE,
  CHANGE_OFFER_FORM_DATA,
  CLEAR_OFFER,
  CLEAR_SELECTED_OFFER,
  CLONE_OFFER,
  CLONE_OFFER_FAIL,
  CLONE_OFFER_SUCCESS,
  CLOSE_OFFER,
  CLOSE_OFFER_FAIL,
  CLOSE_OFFER_SUCCESS,
  DELETE_OFFER,
  DELETE_OFFER_SUCCESS,
  GET_OFFER_WITH_DETAILS,
  GET_OFFER_WITH_DETAILS_SUCCESS,
  GET_OFFRES_LIST_ACTION,
  LOAD_ARTICLES_OFFER,
  LOAD_ARTICLES_OFFER_SUCCESS,
  MANAGE_CREATE_OFFRE_RESPONSE,
  PUT_OFFRES_LIST_ACTION,
  SELECT_OFFER,
  SUBMIT_CLIENT_COMMAND,
  SUBMIT_CLIENT_COMMAND_SUCCESS,
  SUBMIT_CREATE_OFFRE,
  TOGGLE_CHECK_ALL,
} from './constants';

const getOffreList = (values, callback) => ({
  type: GET_OFFRES_LIST_ACTION,
  payload: { ...values, callback },
});

const putOffresList = values => ({
  type: PUT_OFFRES_LIST_ACTION,
  payload: { ...values },
});

const loadArticleOffer = ({ id, callback }) => ({
  type: LOAD_ARTICLES_OFFER,
  payload: { id },
  callback,
});

const loadArticleOfferSuccess = payload => ({
  type: LOAD_ARTICLES_OFFER_SUCCESS,
  payload,
});

const clearOffer = () => ({ type: CLEAR_OFFER });

const deleteOffer = ({ id, filters, callback }) => ({
  type: DELETE_OFFER,
  payload: { id, filters, callback },
});

const deleteOfferSuccess = payload => ({ type: DELETE_OFFER_SUCCESS, payload });

const changeArticleOffer = ({ index, id, selected, required, minQuantity, discount }) => ({
  type: CHANGE_ARTICLE_OFFER,
  payload: {
    index,
    id,
    selected,
    required,
    discount,
    minQuantity,
  },
});

const getOfferWithDetails = ({ id }) => ({
  type: GET_OFFER_WITH_DETAILS,
  payload: { id },
});

const getOfferWithDetailsSuccess = payload => ({
  type: GET_OFFER_WITH_DETAILS_SUCCESS,
  payload,
});

const changeOfferFormData = payload => ({
  type: CHANGE_OFFER_FORM_DATA,
  payload,
  callback: payload.callback,
});

const changeOfferArticle = payload => ({
  type: CHANGE_OFFER_ARTICLE,
  payload,
});

const submitClientCommand = (payload, callback) => ({
  type: SUBMIT_CLIENT_COMMAND,
  payload,
  callback,
});
const submitClientCommandSuccess = response => ({
  type: SUBMIT_CLIENT_COMMAND_SUCCESS,
  payload: response,
});

const manageCreateOffreResponse = (response, callback) => ({
  type: MANAGE_CREATE_OFFRE_RESPONSE,
  payload: { ...response },
  callback,
});

const createOrUpdateOffre = (formData, offerArticledtos, updateOnlyDate, callback) => ({
  type: SUBMIT_CREATE_OFFRE,
  payload: { ...formData, offerArticledtos, updateOnlyDate },
  callback,
});

const selectOffer = payload => ({
  type: SELECT_OFFER,
  payload,
});
const clearSelectedOffer = payload => ({
  type: CLEAR_SELECTED_OFFER,
  payload,
});

const closeOffer = (offerId, filters, callback) => ({
  type: CLOSE_OFFER,
  payload: { offerId, filters, callback },
});

const closeOfferSuccess = payload => ({
  type: CLOSE_OFFER_SUCCESS,
  payload,
});
const closeOfferFail = () => ({
  type: CLOSE_OFFER_FAIL,
});

const cloneOffer = (offerId, filters, callback) => ({
  type: CLONE_OFFER,
  payload: { offerId, filters, callback },
});

const cloneOfferSuccess = filters => ({
  type: CLONE_OFFER_SUCCESS,
  payload: filters,
});

const cloneOfferFail = () => ({
  type: CLONE_OFFER_FAIL,
});

const toggleCheckAll = () => ({
  type: TOGGLE_CHECK_ALL,
});

const applyGlobalRemiseOrMinQt = payload => {
  return {
    type: APPLY_GLOBAL_REMISE_OR_MIN_QT,
    payload,
  };
};

export {
  applyGlobalRemiseOrMinQt,
  toggleCheckAll,
  cloneOffer,
  cloneOfferSuccess,
  cloneOfferFail,
  closeOffer,
  closeOfferSuccess,
  closeOfferFail,
  submitClientCommand,
  submitClientCommandSuccess,
  changeOfferArticle,
  changeOfferFormData,
  getOfferWithDetails,
  getOfferWithDetailsSuccess,
  changeArticleOffer,
  deleteOffer,
  deleteOfferSuccess,
  clearOffer,
  getOffreList,
  putOffresList,
  manageCreateOffreResponse,
  createOrUpdateOffre,
  loadArticleOffer,
  loadArticleOfferSuccess,
  selectOffer,
  clearSelectedOffer,
};
