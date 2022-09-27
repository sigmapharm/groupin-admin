import {
  GET_ARTICLES_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  PUT_ARTICLES_LIST_ACTION,
  SUBMIT_CREATE_ARTICLE,
  SUBMIT_DELETE_ARTICLE,
  SUBMIT_IMPORTED_ARTICLES,
  GET_ARTICLESLABO_LIST_ACTION,
  PUT_ARTICLESLABO_LIST_ACTION,
  CHANGE_ARTICLE_FORM_DATA,
  GET_ARTICLE_DETAILS,
  GET_ARTICLE_DETAILS_SUCCESS,
  CLEAR_ARTICLE_FORM,
} from './constants';

const getArticlesList = (values, callback) => ({
  type: GET_ARTICLES_LIST_ACTION,
  payload: { ...values, callback },
});

const putArticlesList = values => ({
  type: PUT_ARTICLES_LIST_ACTION,
  payload: { ...values },
});

const getArticleslaboList = values => ({
  type: GET_ARTICLESLABO_LIST_ACTION,
  payload: { ...values },
});

const putArticleslaboList = values => ({
  type: PUT_ARTICLESLABO_LIST_ACTION,
  payload: { ...values },
});

const manageCreateArticleResponse = (response, callback) => ({
  type: MANAGE_CREATE_ARTICLE_RESPONSE,
  payload: { ...response },
  callback,
});

export const createArticle = (formData, callback) => ({
  type: SUBMIT_CREATE_ARTICLE,
  payload: { ...formData },
  callback,
});
export const ImportArticles = (LabId, ArticleList, callback) => ({
  type: SUBMIT_IMPORTED_ARTICLES,
  payload: {
    LabId: LabId,
    ArticleList: ArticleList,
  },
  callback,
});
export const deleteArticle = (articleId, callback) => ({
  type: SUBMIT_DELETE_ARTICLE,
  payload: { articleId },
  callback,
});

const changeArticleFormData = payload => ({
  type: CHANGE_ARTICLE_FORM_DATA,
  payload,
});

const getArticleDetails = ({ id }) => ({
  type: GET_ARTICLE_DETAILS,
  payload: { id },
});
const getArticleDetailsSuccess = payload => ({
  type: GET_ARTICLE_DETAILS_SUCCESS,
  payload,
});

const clearArticleForm = () => ({
  type: CLEAR_ARTICLE_FORM,
});

export {
  clearArticleForm,
  getArticleDetailsSuccess,
  getArticleDetails,
  changeArticleFormData,
  getArticlesList,
  putArticlesList,
  getArticleslaboList,
  putArticleslaboList,
  manageCreateArticleResponse,
};
