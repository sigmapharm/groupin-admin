import { LOCAL_API_BASE_PATH, PROD_API_BASE_PATH } from './constants';

const getBasePath = () => {
  if (process.env.NODE_ENV === 'production') {
    return PROD_API_BASE_PATH;
  }
  return LOCAL_API_BASE_PATH;
};

export default {
  getBasePath,
};
