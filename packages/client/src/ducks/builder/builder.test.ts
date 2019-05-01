import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  setBuilderLoadingState,
  setBuilderSuccessFlag,
  clearBuilderActionCreator,
} from './actions';

describe('builder duck', () => {
  describe('builder action creators', () => {
    it('set builder loading state action creator', () => {
      const state = false;
      const expectedActionObject = {
        type: ActionConstants.SET_BUILDER_LOADING_STATE,
        payload: state,
      };
      expect(setBuilderLoadingState(state)).toEqual(expectedActionObject);
    });

    it('set builder success flag action creator', () => {
      const state = false;
      const expectedActionObject = {
        type: ActionConstants.SET_BUILDER_SUCCESS_FLAG,
        payload: state,
      };
      expect(setBuilderSuccessFlag(state)).toEqual(expectedActionObject);
    });

    it('clear all data in builder action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.CLEAR_BUILDER,
      };
      expect(clearBuilderActionCreator()).toEqual(expectedActionObject);
    });
  });

  describe('builder reducer', () => {
    it('set builder loading state reducer', () => {
      const state = true;
      expect(reducer(initialState, setBuilderLoadingState(state)).loading).toBe(
        true
      );
    });

    it('set builder success flag reducer', () => {
      const state = true;
      expect(reducer(initialState, setBuilderSuccessFlag(state)).success).toBe(
        true
      );
    });

    it('clear builder reducer', () => {
      const state = {
        ...initialState,
        loading: true,
      };
      expect(reducer(state, clearBuilderActionCreator()).loading).toBe(
        undefined
      );
    });
  });
});
