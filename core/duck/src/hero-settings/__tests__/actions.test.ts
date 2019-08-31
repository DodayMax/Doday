import actions, { HeroSettingsActionConstants } from '../actions';

describe('hero settings action creators', () => {
  it('toggle drawer action creator', () => {
    const expectedActionObject = {
      type: HeroSettingsActionConstants.TOGGLE_DRAWER,
    };
    expect(actions.toggleDrawerActionCreator()).toEqual(expectedActionObject);
  });

  it('toggle drawer with payload value action creator', () => {
    const expectedActionObject = {
      type: HeroSettingsActionConstants.TOGGLE_DRAWER,
      payload: true,
    };
    expect(actions.toggleDrawerActionCreator(true)).toEqual(
      expectedActionObject
    );
  });

  it('toggle doday app action creator', () => {
    const expectedActionObject = {
      type: HeroSettingsActionConstants.TOGGLE_DODAY_APP,
    };
    expect(actions.toggleDodayAppActionCreator()).toEqual(expectedActionObject);
  });

  it('toggle theme action creator', () => {
    const mode = 'light';
    const expectedActionObject = {
      type: HeroSettingsActionConstants.TOGGLE_THEME,
      payload: mode,
    };
    expect(actions.toggleThemeActionCreator(mode)).toEqual(
      expectedActionObject
    );
  });
});
