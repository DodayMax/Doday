import reducer, { initialState } from './reducer';
import { ActionConstants, setAuthenticatedStatus, updateAuthenticatedStatus } from './actions';

describe('auth duck', () => {
  describe('auth action creators', () => {
    it('set auth status action creator', () => {
      const status = true;
      const expectedActionObject = {
        type: ActionConstants.SET_AUTHENTICATED_STATUS,
        payload: status,
      };
      expect(setAuthenticatedStatus(status)).toEqual(expectedActionObject);
    });
    it('update auth status action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.UPDATE_AUTHENTICATED_STATUS,
      };
      expect(updateAuthenticatedStatus()).toEqual(expectedActionObject);
    });
  });

  describe('auth reducer', () => {
    it('set auth status reducer', () => {
      const status = true;
      expect(reducer(initialState, setAuthenticatedStatus(status)).isAuthenticated).toEqual(status);
    });
  });
});