import actions, { BuilderActionConstants } from '../actions';

describe('builder action creators', () => {
  it('set builder loading state action creator', () => {
    const state = false;
    const expectedActionObject = {
      type: BuilderActionConstants.SET_BUILDER_LOADING_STATE,
      payload: state,
    };
    expect(actions.setBuilderLoadingStateActionCreator(state)).toEqual(
      expectedActionObject
    );
  });

  it('clear all data in builder action creator', () => {
    const expectedActionObject = {
      type: BuilderActionConstants.CLEAR_BUILDER,
    };
    expect(actions.clearBuilderActionCreator()).toEqual(expectedActionObject);
  });
});
