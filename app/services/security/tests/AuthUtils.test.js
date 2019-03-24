import AuthUtils from '../AuthUtils';
import AccessTokenStorage from '../AccessTokenStorage';

describe('isAuthenticated', () => {
  it('should return true if access token is available', () => {
    // given
    AccessTokenStorage.get = jest.fn(() => 'token');
    // when
    const authenticated = AuthUtils.isAuthenticated();
    // then
    expect(AccessTokenStorage.get).toHaveBeenCalled();
    expect(authenticated).toBeTruthy();
  });
  it('should return false if access token is null', () => {
    // given
    AccessTokenStorage.get = jest.fn(() => null);
    // when
    const authenticated = AuthUtils.isAuthenticated();
    // then
    expect(AccessTokenStorage.get).toHaveBeenCalled();
    expect(authenticated).toBeFalsy();
  });
  it("should return false if access token is 'undefined'", () => {
    // given
    AccessTokenStorage.get = jest.fn(() => 'undefined');
    // when
    const authenticated = AuthUtils.isAuthenticated();
    // then
    expect(AccessTokenStorage.get).toHaveBeenCalled();
    expect(authenticated).toBeFalsy();
  });
  it('should return false if access token is undefined', () => {
    // given
    AccessTokenStorage.get = jest.fn(() => undefined);
    // when
    const authenticated = AuthUtils.isAuthenticated();
    // then
    expect(AccessTokenStorage.get).toHaveBeenCalled();
    expect(authenticated).toBeFalsy();
  });
});
