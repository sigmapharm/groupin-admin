import { GET_REPORTING_ACTION, PUT_REPORTING_ACTION } from './constants';

const getReporting = payload => ({
  type: GET_REPORTING_ACTION,
  payload,
});

const putReporting = payload => ({
  type: PUT_REPORTING_ACTION,
  payload,
});

export { getReporting, putReporting };
