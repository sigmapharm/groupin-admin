import AccessTokenStorage, { ACCESS_TOKEN_KEY } from '../AccessTokenStorage';

describe('AccessTokenStorage', () => {
  /* eslint-disable no-proto */
  window.localStorage.__proto__ = {
    getItem: jest.fn(() => 'fakeToken'),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  describe('get', () => {
    it('should return access token stored in localStorage', () => {
      expect(AccessTokenStorage.get()).toEqual('fakeToken');
      expect(window.localStorage.getItem).toHaveBeenCalledWith(
        ACCESS_TOKEN_KEY,
      );
    });
  });
  describe('set', () => {
    it('should set access token in localStorage', () => {
      AccessTokenStorage.set('toto');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        ACCESS_TOKEN_KEY,
        'toto',
      );
    });
  });
  describe('clear', () => {
    it('should clear the access token in localStorage', () => {
      AccessTokenStorage.clear();
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(
        ACCESS_TOKEN_KEY,
      );
    });
  });
});
