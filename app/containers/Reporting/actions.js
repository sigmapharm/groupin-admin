import {
  GET_REPORTING_ACTION,
  PUT_REPORTING_ACTION,
  GET_PRINT_REPORT_PDF,
  PUT_PRINT_REPORT_PDF,
  GET_REPORT_CA,
  PUT_REPORT_CA,
} from './constants';

const getReporting = payload => ({
  type: GET_REPORTING_ACTION,
  payload,
});

const putReporting = payload => ({
  type: PUT_REPORTING_ACTION,
  payload,
});

const getReportingPDF = payload => ({
  type: GET_PRINT_REPORT_PDF,
  payload,
});

const putReportinPDF = payload => ({
  type: PUT_PRINT_REPORT_PDF,
  payload,
});

const getReportingCA = payload => ({
  type: GET_REPORT_CA,
  payload,
});

const putReportinCA = payload => ({
  type: PUT_REPORT_CA,
  payload,
});

export { getReporting, putReporting, putReportinPDF, getReportingPDF, getReportingCA, putReportinCA };
