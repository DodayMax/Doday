import reducer, { initialHeroSettingsState } from '../reducer';
import actions from '../actions';

describe("test hero-settings's reducers", () => {
  it('toggle drawer reducer', () => {
    expect(
      reducer(initialHeroSettingsState, actions.toggleDrawerActionCreator())
        .isDrawerCollapsed
    ).toBe(true);
  });

  it('toggle drawer with payload value reducer', () => {
    expect(
      reducer(
        initialHeroSettingsState,
        actions.toggleDrawerActionCreator(false)
      ).isDrawerCollapsed
    ).toBe(false);
  });

  it('toggle theme reducer', () => {
    const mode = 'light';
    expect(
      reducer(initialHeroSettingsState, actions.toggleThemeActionCreator(mode))
        .theme
    ).toBe(mode);
  });
});
