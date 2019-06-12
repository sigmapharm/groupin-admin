import {
  GET_ARTICLES_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  PUT_ARTICLES_LIST_ACTION,
  SUBMIT_CREATE_ARTICLE,
  SUBMIT_DELETE_ARTICLE,
  GET_ARTICLESLABO_LIST_ACTION,
  PUT_ARTICLESLABO_LIST_ACTION,
} from './constants';

const getArticlesList = values => ({
  type: GET_ARTICLES_LIST_ACTION,
  payload: { ...values },
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
export const deleteArticle = formData => ({
  type: SUBMIT_DELETE_ARTICLE,
  payload: { ...formData },
});
export {
  getArticlesList,
  putArticlesList,
  getArticleslaboList,
  putArticleslaboList,
  manageCreateArticleResponse,
};
