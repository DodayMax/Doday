import actions, { AuthActionConstants } from '../actions';
import { hero, ToolBeacon } from '@doday/lib';

describe("test auth's ducks", () => {
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
