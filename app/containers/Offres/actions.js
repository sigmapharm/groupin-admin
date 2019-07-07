import {
  CHANGE_ARTICLE_OFFER,
  CHANGE_OFFER_ARTICLE,
  CHANGE_OFFER_FORM_DATA,
  CLEAR_OFFER,
  DELETE_OFFER,
  DELETE_OFFER_SUCCESS,
  GET_OFFER_WITH_DETAILS,
  GET_OFFER_WITH_DETAILS_SUCCESS,
  GET_OFFRES_LIST_ACTION,
  LOAD_ARTICLES_OFFER,
  LOAD_ARTICLES_OFFER_SUCCESS,
  MANAGE_CREATE_OFFRE_RESPONSE,
  PUT_OFFRES_LIST_ACTION,
  SUBMIT_CLIENT_COMMAND,
  SUBMIT_CLIENT_COMMAND_SUCCESS,
  SUBMIT_CREATE_OFFRE,
} from './constants';

const getOffreList = values => ({
  type: GET_OFFRES_LIST_ACTION,
  payload: {...values},
});

const putOffresList = values => ({
  type: PUT_OFFRES_LIST_ACTION,
  payload: {...values},
});

const loadArticleOffer = ({id}) => ({
  type: LOAD_ARTICLES_OFFER,
  payload: {id},
});

const loadArticleOfferSuccess = payload => ({
  type: LOAD_ARTICLES_OFFER_SUCCESS,
  payload,
});

const clearOffer = () => ({type: CLEAR_OFFER});

const deleteOffer = ({id, filters}) => ({
  type: DELETE_OFFER,
  payload: {id, filters},
});

const deleteOfferSuccess = payload => ({type: DELETE_OFFER_SUCCESS, payload});

const changeArticleOffer = ({index, id, selected, discount}) => ({
  type: CHANGE_ARTICLE_OFFER,
  payload: {index, id, selected, discount},
});

const getOfferWithDetails = ({id}) => ({
  type: GET_OFFER_WITH_DETAILS,
  payload: {id},
});

const getOfferWithDetailsSuccess = payload => ({
  type: GET_OFFER_WITH_DETAILS_SUCCESS,
  payload,
});

const changeOfferFormData = payload => ({
  type: CHANGE_OFFER_FORM_DATA,
  payload,
});

const changeOfferArticle = (payload) => ({
  type: CHANGE_OFFER_ARTICLE,
  payload,
});

const submitClientCommand = (payload,callback) => ({
  type: SUBMIT_CLIENT_COMMAND,
  payload,callback
});
const submitClientCommandSuccess = (response,callback) => ({
  type: SUBMIT_CLIENT_COMMAND_SUCCESS,
  payload:response,
  callback

});

const manageCreateOffreResponse = (response, callback) => ({
  type: MANAGE_CREATE_OFFRE_RESPONSE,
  payload: {...response},
  callback,
});

const createOrUpdateOffre = (formData, offerArticledtos, callback) => ({
  type: SUBMIT_CREATE_OFFRE,
  payload: {...formData, offerArticledtos},
  callback,
});

export {
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
};
