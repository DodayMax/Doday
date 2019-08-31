import { ToastState } from '@doday/lib';
import reducer, { initialToastState } from '../reducer';
import actions from '../actions';

describe("test toast's reducers", () => {
  it('open reducer', () => {
    const options: ToastState = {
      open: true,
      messages: ['Test message'],
    };
    expect(
      reducer(initialToastState, actions.openToastActionCreator(options))
    ).toEqual({
      ...initialToastState,
      ...options,
    });
  });

  it('close reducer', () => {
    const testState: ToastState = {
      open: true,
      messages: ['Test message'],
    };
    const newState = reducer(
      {
        ...initialToastState,
        ...testState,
      },
      actions.closeToastActionCreator()
    );
    expect(newState.messages.length).toBe(0);
    expect(newState.open).toBe(false);
  });
});
