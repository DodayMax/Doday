import reducer, { initialHeroSettingsState } from '../reducer';
import { toggleDrawerActionCreator } from '../actions';

describe("test hero-settings's reducers", () => {
  it('toggle drawer reducer', () => {
    expect(
      reducer(initialHeroSettingsState, toggleDrawerActionCreator())
        .isDrawerCollapsed
    ).toBe(true);
  });
});
