import reducer, { initialBuilderStatusState } from '../reducer';
import {
  setBuilderLoadingStateActionCreator,
  clearBuilderActionCreator,
} from '../actions';

describe('builder status state reducer', () => {
  it('set builder loading state reducer', () => {
    const state = true;
    expect(
      reducer(
        initialBuilderStatusState,
        setBuilderLoadingStateActionCreator(state)
      ).loading
    ).toBe(true);
  });

  it('clear builder status state reducer', () => {
    const state = {
      ...initialBuilderStatusState,
      loading: true,
    };
    expect(reducer(state, clearBuilderActionCreator()).loading).toBe(undefined);
  });
});
