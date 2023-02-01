import AccessTokenStorage from './AccessTokenStorage';

const isAuthenticated = () => {
  const token = AccessTokenStorage.get();
  return token !== null && token !== '' && token !== undefined && token !== 'undefined';
};

export default {
  isAuthenticated,
};
