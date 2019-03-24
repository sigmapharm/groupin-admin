import { fromJS } from 'immutable';
import reducer, { initialState } from '../reducer';
import { setNetworkingActive, setNetworkingInactive } from '../actions';

describe('homepage reducer', () => {
  it('should return default state if no action is passed', () => {
    expect(reducer(undefined, undefined)).toEqual(initialState);
  });
  it('should return default state if no action type is passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should return default state if no state is passed', () => {
    expect(reducer(undefined, { type: 'NONE' })).toEqual(initialState);
  });
  describe('global loader', () => {
    it('should enable loader', () => {
      // when
      const newState = reducer(initialState, setNetworkingActive());
      // then
      expect(newState).toEqual(
        fromJS({
          ...initialState.toJS(),
          loader: true,
        }),
      );
    });
    it('should disable loader', () => {
      // when
      const newState = reducer(initialState, setNetworkingInactive());
      // then
      expect(newState).toEqual(
        fromJS({
          ...initialState.toJS(),
          loader: false,
        }),
      );
    });
  });
});
