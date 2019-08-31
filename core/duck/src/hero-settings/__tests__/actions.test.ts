import { ActionConstants, actionCreators } from '../actions';

describe('hero settings action creators', () => {
  it('toggle drawer action creator', () => {
    const expectedActionObject = {
      type: ActionConstants.TOGGLE_DRAWER,
    };
    expect(actionCreators.toggleDrawerActionCreator()).toEqual(
      expectedActionObject
    );
  });

  it('toggle drawer with payload value action creator', () => {
    const expectedActionObject = {
      type: ActionConstants.TOGGLE_DRAWER,
      payload: true,
    };
    expect(actionCreators.toggleDrawerActionCreator(true)).toEqual(
      expectedActionObject
    );
  });

  it('toggle doday app action creator', () => {
    const expectedActionObject = {
      type: ActionConstants.TOGGLE_DODAY_APP,
    };
    expect(actionCreators.toggleDodayAppActionCreator()).toEqual(
      expectedActionObject
    );
  });

  it('toggle theme action creator', () => {
    const mode = 'light';
    const expectedActionObject = {
      type: ActionConstants.TOGGLE_THEME,
      payload: mode,
    };
    expect(actionCreators.toggleThemeActionCreator(mode)).toEqual(
      expectedActionObject
    );
  });
});
