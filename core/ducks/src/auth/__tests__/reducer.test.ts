import reducer, { initialState } from '../reducer';
import actions from '../actions';
import { hero, ToolBeacon } from '@doday/lib';

describe("test auth's reducers", () => {
  it('set hero reducer', () => {
    expect(reducer(initialState, actions.setHeroActionCreator(hero))).toEqual({
      ...initialState,
      hero,
    });
  });

  it('set Hero active tools to store reducer', () => {
    const activeTools: { [key: string]: ToolBeacon } = {};
    expect(
      reducer(
        initialState,
        actions.setActiveToolBeaconsActionCreator(activeTools)
      )
    ).toEqual({
      ...initialState,
      activeTools,
    });
  });
});
