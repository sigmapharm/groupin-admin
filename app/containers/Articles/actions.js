import {
  GET_ARTICLES_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  PUT_ARTICLES_LIST_ACTION,
  SUBMIT_CREATE_ARTICLE,
} from './constants';

const getArticlesList = values => ({
  type: GET_ARTICLES_LIST_ACTION,
  payload: { ...values },
});

const putArticlesList = values => ({
  type: PUT_ARTICLES_LIST_ACTION,
  payload: { ...values },
});


const manageCreateArticleResponse = (response, callback) => ({
  type: MANAGE_CREATE_ARTICLE_RESPONSE,
  payload: { ...response },
  callback,
});

export const createArticle = (formData, callback) => ({
  type:  SUBMIT_CREATE_ARTICLE,
  payload: { ...formData },
  callback,
});

export { getArticlesList, putArticlesList,manageCreateArticleResponse };
