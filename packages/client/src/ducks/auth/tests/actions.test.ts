import {
  ActionConstants,
  fetchHeroActionCreator,
  setHeroActionCreator,
  setActiveToolBeaconsActionCreator,
} from '../actions';
import { hero } from '@root/lib/common-interfaces/fake-data';
import { toolBeacons } from '@root/tools';

describe("test auth's ducks", () => {
  describe('auth action creators', () => {
    it('fetch Hero action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_HERO,
      };
      expect(fetchHeroActionCreator()).toEqual(expectedActionObject);
    });
    it('set Hero action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.SET_HERO,
        payload: hero,
      };
      expect(setHeroActionCreator(hero)).toEqual(expectedActionObject);
    });
    it('set active tools for Hero to the store action creator', () => {
      const activeTools = toolBeacons.filter(tool =>
        hero.tools.find(item => item === tool.config.sysname)
      );
      const expectedActionObject = {
        type: ActionConstants.SET_ACTIVE_TOOL_BEACONS,
        payload: activeTools,
      };
      expect(setActiveToolBeaconsActionCreator(activeTools)).toEqual(
        expectedActionObject
      );
    });
  });
});
