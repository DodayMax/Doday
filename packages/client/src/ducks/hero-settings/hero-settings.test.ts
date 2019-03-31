import reducer, { initialState } from './reducer';

describe('hero-settings duck', () => {
  it('has right initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });
});