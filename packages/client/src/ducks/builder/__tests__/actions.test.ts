import {
  ActionConstants,
  setBuilderLoadingStateActionCreator,
  setBuilderSuccessFlagActionCreator,
  clearBuilderActionCreator,
} from '../actions';

describe('builder action creators', () => {
  it('set builder loading state action creator', () => {
    const state = false;
    const expectedActionObject = {
      type: ActionConstants.SET_BUILDER_LOADING_STATE,
      payload: state,
    };
    expect(setBuilderLoadingStateActionCreator(state)).toEqual(
      expectedActionObject
    );
  });

  it('set builder success flag action creator', () => {
    const state = false;
    const expectedActionObject = {
      type: ActionConstants.SET_BUILDER_SUCCESS_FLAG,
      payload: state,
    };
    expect(setBuilderSuccessFlagActionCreator(state)).toEqual(
      expectedActionObject
    );
  });

  it('clear all data in builder action creator', () => {
    const expectedActionObject = {
      type: ActionConstants.CLEAR_BUILDER,
    };
    expect(clearBuilderActionCreator()).toEqual(expectedActionObject);
  });
});
