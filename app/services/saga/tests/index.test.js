import 'isomorphic-fetch';
import * as GlobalActions from '../../../containers/App/actions';
import * as requestWithAuth from '../../request/request-with-auth';
import { callApi } from '../index';

describe('callApi', () => {
  const doNothing = () => {};
  beforeAll(() => {
    // given
    requestWithAuth.default = jest.fn();
    jest.mock('../../../containers/App/actions', () =>
      Object.assign(require.requireActual('../../../containers/App/actions'), {
        setNetworkingActive: jest.fn(() => ({ type: 'blank' })),
        setNetworkingInactive: jest.fn(() => ({ type: 'blank' })),
      }),
    );
    import('../../../containers/App/actions');
  });
  describe('setting global networking', () => {
    afterEach(() => {
      GlobalActions.setNetworkingActive.mockClear();
      GlobalActions.setNetworkingInactive.mockClear();
    });
    it('should set networking to active and inactive', () => {
      // when
      const gen = callApi('url', null, {}, doNothing, true, true);
      while (!gen.next().done) {
        gen.next();
      }
      // then
      expect(GlobalActions.setNetworkingActive).toHaveBeenCalled();
      expect(GlobalActions.setNetworkingInactive).toHaveBeenCalled();
    });
    it('should set networking to active and not inactive', () => {
      // when
      const gen = callApi('url', null, {}, doNothing, true, false);
      while (!gen.next().done) {
        gen.next();
      }
      // then
      expect(GlobalActions.setNetworkingActive).toHaveBeenCalled();
      expect(GlobalActions.setNetworkingInactive).not.toHaveBeenCalled();
    });
    it('should set networking to not active and not inactive', () => {
      // when
      const gen = callApi('url', null, {}, doNothing, false, false);
      while (!gen.next().done) {
        gen.next();
      }
      // then
      expect(GlobalActions.setNetworkingActive).not.toHaveBeenCalled();
      expect(GlobalActions.setNetworkingInactive).not.toHaveBeenCalled();
    });
    it('should take default values when not provided', () => {
      // when
      const gen = callApi('url', null, {}, doNothing);
      while (!gen.next().done) {
        gen.next();
      }
      // then
      expect(GlobalActions.setNetworkingActive).toHaveBeenCalled();
      expect(GlobalActions.setNetworkingInactive).toHaveBeenCalled();
    });
  });
  describe('calling the API', () => {
    describe('formatting Data', () => {
      it('should call API and format Data', () => {
        const formatFn = jest.fn();
        const gen = callApi('url', null, {}, formatFn, false, false);
        while (!gen.next().done) {
          gen.next();
        }
        expect(formatFn).toHaveBeenCalled();
      });
      it('should not format data', () => {
        const formatDataFunction = jest.fn();
        const gen = callApi('url', null, {}, null, false, false);
        while (!gen.next().done) {
          gen.next();
        }
        expect(formatDataFunction).not.toHaveBeenCalled();
      });
    });
    describe('callback action', () => {
      it('should call callback action', () => {
        // given
        const cbAction = jest.fn(() => ({ type: 'blank' }));
        // when
        const gen = callApi('url', cbAction, {}, doNothing, true, false);
        while (!gen.next().done) {
          gen.next();
        }
        // then
        expect(cbAction).toHaveBeenCalled();
      });
      it('should not call callback action', () => {
        // given
        const cbAction = jest.fn(() => ({ type: 'blank' }));
        // when
        const gen = callApi('url', null, {}, doNothing, true, false);
        while (!gen.next().done) {
          gen.next();
        }
        // then
        expect(cbAction).not.toHaveBeenCalled();
      });
      it('should throw given exception', () => {
        // given
        const error = new Error('toto');
        requestWithAuth.default = jest.fn().mockImplementation(() => {
          throw error;
        });
        // then
        const gen = callApi('url', null, undefined, null, false, false);
        expect(() => gen.next()).toThrow(error);
        expect(requestWithAuth.default).toHaveBeenCalledWith('url', {
          method: 'GET',
          headers: {},
        });
      });
    });
  });
});
