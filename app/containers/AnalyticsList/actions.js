export const GET_PAHRAMCIES_ANALYTICS = 'GET_PAHRAMCIES_ANALYTICS';

export const PUT_PAHRAMCIES_ANALYTICS = 'PUT_PAHRAMCIES_ANALYTICS';

export const PRINT_PAHRAMCIES_ANALYTICS = 'PRINT_PAHRAMCIES_ANALYTICS';

export const GET_LABOS_ANALYTICS = 'GET_LABOS_ANALYTICS';

export const PUT_LABOS_ANALYTICS = 'PUT_LABOS_ANALYTICS';

export const PRINT_LABOS_ANALYTICS = 'PRINT_LABOS_ANALYTICS';

export const getPharmaciesAnalytics = payload => ({
  type: GET_PAHRAMCIES_ANALYTICS,
  payload,
});

export const putPharmaciesAnalytics = payload => ({
  type: PUT_PAHRAMCIES_ANALYTICS,
  payload,
});

export const printPharmaciesAnalytics = payload => ({
  type: PRINT_PAHRAMCIES_ANALYTICS,
  payload,
});

export const getLabosAnalytics = payload => ({
  type: GET_LABOS_ANALYTICS,
  payload,
});

export const putLabosAnalytics = payload => ({
  type: PUT_LABOS_ANALYTICS,
  payload,
});

export const printLabosAnalytics = payload => ({
  type: PRINT_LABOS_ANALYTICS,
  payload,
});
