import ApiPathService from '../ApiPathService';

describe('apiPathService', () => {
  describe('api base path', () => {
    it('should return api base path in development mode', () => {
      process.env.NODE_ENV = 'development';
      expect(ApiPathService.getBasePath()).toEqual('http://localhost:8080');
    });
    it('should return api base path in production mode', () => {
      process.env.NODE_ENV = 'production';
      expect(ApiPathService.getBasePath()).toEqual('');
    });
  });
});
