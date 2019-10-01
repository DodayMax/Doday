import reducer, { initialBuilderStatusState } from '../reducer';
import actions from '../actions';

describe('builder status state reducer', () => {
  it('set builder loading state reducer', () => {
    const state = true;
    expect(
      reducer(
        initialBuilderStatusState,
        actions.setBuilderLoadingStateActionCreator(state)
      ).loading
    ).toBe(true);
  });

  it('clear builder status state reducer', () => {
    const state = {
      ...initialBuilderStatusState,
      loading: true,
    };
    expect(reducer(state, actions.clearBuilderActionCreator()).loading).toBe(
      undefined
    );
  });
});
