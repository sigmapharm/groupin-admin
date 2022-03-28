import { GET_STATISTICS_ACTION, PUT_STATISTICS_ACTION } from './constants';

const getStatistics = userRole => ({
  type: GET_STATISTICS_ACTION,
  payload: { userRole },
});

const putStatistics = payload => ({
  type: PUT_STATISTICS_ACTION,
  payload,
});

export { getStatistics, putStatistics };
