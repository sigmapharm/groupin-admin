import { GET_ARTICLE_STATS } from './constants';

const getReporting = payload => ({
  type: GET_ARTICLE_STATS,
  payload,
});

// const putReporting = payload => ({
//   type: PUT_REPORTING_ACTION,
//   payload,
// });

export { getReporting };
