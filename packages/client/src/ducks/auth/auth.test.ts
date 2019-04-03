import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  setAuthenticatedStatus,
  fetchHero,
  setHero,
} from './actions';

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
    it('fetch Hero action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_HERO,
      };
      expect(fetchHero()).toEqual(expectedActionObject);
    });
    it('set Hero action creator', () => {
      const hero = {
        did: 'test',
        displayName: 'Ivan Smirnov',
        google: 'test',
      };
      const expectedActionObject = {
        type: ActionConstants.SET_HERO,
        payload: hero,
      };
      expect(setHero(hero)).toEqual(expectedActionObject);
    });
  });

  describe('auth reducer', () => {
    it('set auth status reducer', () => {
      const status = true;
      expect(
        reducer(initialState, setAuthenticatedStatus(status)).isAuthenticated
      ).toEqual(status);
    });
    it('set hero reducer', () => {
      const hero = {
        did: 'test',
        displayName: 'Ivan Smirnov',
        google: 'test',
      };
      expect(reducer(initialState, setHero(hero)).hero.did).toEqual(hero.did);
    });
  });
});
