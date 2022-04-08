import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  GET_REPORTING_ACTION,
  PUT_REPORTING_ACTION,
  GET_PRINT_REPORT_PDF,
  PUT_PRINT_REPORT_PDF,
  GET_REPORT_CA,
  PUT_REPORT_CA,
} from './constants';

export const formDataInitialState = fromJS({ reporting: {}, reportingPdf: {}, reportingCa: '' });

export const initialState = fromJS({ reporting: [], reportingPdf: {}, reportingCa: {} });

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_REPORTING_ACTION: {
      return state.merge({ ...action.payload });
    }
    case PUT_REPORTING_ACTION: {
      return state.merge({ reporting: action.payload });
    }

    case GET_PRINT_REPORT_PDF: {
      return state.merge({ ...action.payload });
    }
    case PUT_PRINT_REPORT_PDF: {
      return state.merge({ reportingPdf: action.payload });
    }

    case GET_REPORT_CA: {
      return state.merge({ ...action.payload });
    }
    case PUT_REPORT_CA: {
      return state.merge({ reportingCa: action.payload });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
