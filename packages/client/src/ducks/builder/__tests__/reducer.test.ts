import reducer, { initialBuilderStatusState } from '../reducer';
import {
  setBuilderLoadingStateActionCreator,
  setBuilderSuccessFlagActionCreator,
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

  it('set builder success flag reducer', () => {
    const state = true;
    expect(
      reducer(
        initialBuilderStatusState,
        setBuilderSuccessFlagActionCreator(state)
      ).success
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
