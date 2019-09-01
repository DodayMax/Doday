import actions, { AuthActionConstants } from '../actions';
import { hero, ToolBeacon } from '@doday/lib';

describe("test auth's ducks", () => {
  describe('auth action creators', () => {
    it('fetch Hero action creator', () => {
      const expectedActionObject = {
        type: AuthActionConstants.FETCH_HERO,
      };
      expect(actions.fetchHeroActionCreator()).toEqual(expectedActionObject);
    });

    it('set Hero action creator', () => {
      const expectedActionObject = {
        type: AuthActionConstants.SET_HERO,
        payload: hero,
      };
      expect(actions.setHeroActionCreator(hero)).toEqual(expectedActionObject);
    });

    it('set active tools for Hero to the store action creator', () => {
      const activeTools: { [key: string]: ToolBeacon } = {};
      const expectedActionObject = {
        type: AuthActionConstants.SET_ACTIVE_TOOL_BEACONS,
        payload: activeTools,
      };
      expect(actions.setActiveToolBeaconsActionCreator(activeTools)).toEqual(
        expectedActionObject
      );
    });
  });
});
