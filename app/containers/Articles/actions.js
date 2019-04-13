import {
  GET_ARTICLES_LIST_ACTION,
  PUT_ARTICLES_LIST_ACTION,
} from './constants';

const getArticlesList = values => ({
  type: GET_ARTICLES_LIST_ACTION,
  payload: { ...values },
});

const putArticlesList = values => ({
  type: PUT_ARTICLES_LIST_ACTION,
  payload: { ...values },
});

export { getArticlesList, putArticlesList };
