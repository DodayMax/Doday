import reducer, { initialState } from '../reducer';
import {
  setHeroActionCreator,
  setActiveToolBeaconsActionCreator,
} from '../actions';
import { hero } from '@root/lib/common-interfaces/fake-data';
import { toolBeacons } from '@root/tools';

describe("test auth's reducers", () => {
  it('set hero reducer', () => {
    expect(reducer(initialState, setHeroActionCreator(hero))).toEqual({
      ...initialState,
      hero,
    });
  });

  it('set Hero active tools to store reducer', () => {
    const activeTools = toolBeacons.filter(tool =>
      hero.tools.find(item => item === tool.config.sysname)
    );
    expect(
      reducer(initialState, setActiveToolBeaconsActionCreator(activeTools))
    ).toEqual({
      ...initialState,
      activeTools,
    });
  });
});
