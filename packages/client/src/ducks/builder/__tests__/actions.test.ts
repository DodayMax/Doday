import { ActionConstants, actionCreators } from '../actions';

describe('builder action creators', () => {
  it('set builder loading state action creator', () => {
    const state = false;
    const expectedActionObject = {
      type: ActionConstants.SET_BUILDER_LOADING_STATE,
      payload: state,
    };
    expect(actionCreators.setBuilderLoadingStateActionCreator(state)).toEqual(
      expectedActionObject
    );
  });

  it('set builder success flag action creator', () => {
    const state = false;
    const expectedActionObject = {
      type: ActionConstants.SET_BUILDER_SUCCESS_FLAG,
      payload: state,
    };
    expect(actionCreators.setBuilderSuccessFlagActionCreator(state)).toEqual(
      expectedActionObject
    );
  });

  it('clear all data in builder action creator', () => {
    const expectedActionObject = {
      type: ActionConstants.CLEAR_BUILDER,
    };
    expect(actionCreators.clearBuilderActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
