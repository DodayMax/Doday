import reducer, { initialHeroSettingsState } from '../reducer';
import { actionCreators } from '../actions';

describe("test hero-settings's reducers", () => {
  it('toggle drawer reducer', () => {
    expect(
      reducer(
        initialHeroSettingsState,
        actionCreators.toggleDrawerActionCreator()
      ).isDrawerCollapsed
    ).toBe(true);
  });

  it('toggle theme reducer', () => {
    const mode = 'light';
    expect(
      reducer(
        initialHeroSettingsState,
        actionCreators.toggleThemeActionCreator(mode)
      ).theme
    ).toBe(mode);
  });
});
