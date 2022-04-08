import {
  GET_ARTICLE_STATS,
  PUT_REPORTING_ACTION,
  GET_PHARMA_STATS,
  PUT_PHARMA_STATS,
  GET_LABOS_STATS,
  PUT_LABOS_STATS,
  GET_CITY_STATS,
  PUT_CITY_STATS,
  GET_PRINT_PHRAMA_STATS,
  PUT_PRINT_PHRAMA_STATS,
} from './constants';

// articles

const getArticles = payload => {
  return {
    type: GET_ARTICLE_STATS,
    payload,
  };
};

const putArticles = payload => {
  return {
    type: PUT_REPORTING_ACTION,
    payload,
  };
};

// articles

const getPharmas = payload => {
  return {
    type: GET_PHARMA_STATS,
    payload,
  };
};

const putPharmas = payload => {
  return {
    type: PUT_PHARMA_STATS,
    payload,
  };
};

// labos

const getLabos = payload => {
  return {
    type: GET_LABOS_STATS,
    payload,
  };
};

const putLabos = payload => {
  return {
    type: PUT_LABOS_STATS,
    payload,
  };
};

// city

const getCity = payload => {
  return {
    type: GET_CITY_STATS,
    payload,
  };
};

const putCity = payload => {
  return {
    type: PUT_CITY_STATS,
    payload,
  };
};

// print phrama

const getPrintPharama = payload => {
  return {
    type: GET_PRINT_PHRAMA_STATS,
    payload,
  };
};

const putPrintPharama = payload => {
  return {
    type: PUT_PRINT_PHRAMA_STATS,
    payload,
  };
};

export {
  putArticles,
  getArticles,
  getPharmas,
  putPharmas,
  getLabos,
  putLabos,
  getCity,
  putCity,
  getPrintPharama,
  putPrintPharama,
};
