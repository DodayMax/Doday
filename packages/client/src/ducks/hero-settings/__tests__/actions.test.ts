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

  it('toggle doday app action creator', () => {
    const expectedActionObject = {
      type: ActionConstants.TOGGLE_DODAY_APP,
    };
    expect(actionCreators.toggleDodayAppActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
