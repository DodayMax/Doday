import { ToastState } from '@root/lib/models';
import reducer, { initialToastState } from '../reducer';
import { actionCreators } from '../actions';

describe("test toast's reducers", () => {
  it('open reducer', () => {
    const options: ToastState = {
      open: true,
      messages: ['Test message'],
    };
    expect(
      reducer(initialToastState, actionCreators.openToastActionCreator(options))
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
      actionCreators.closeToastActionCreator()
    );
    expect(newState.messages.length).toBe(0);
    expect(newState.open).toBe(false);
  });
});
