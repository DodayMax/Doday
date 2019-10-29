import { ToastState } from '@doday/lib';
import actions, {
  OpenToastAction,
  ToastActionConstants,
  CloseToastAction,
} from '../actions';

describe('toasts action creators', () => {
  it('open toast', () => {
    const options: ToastState = {
      open: true,
      type: 'success',
      messages: ['Test message'],
    };
    const expectedActionObject: OpenToastAction = {
      type: ToastActionConstants.OPEN,
      payload: options,
    };
    expect(actions.openToastActionCreator(options)).toEqual(
      expectedActionObject
    );
  });

  it('close toast', () => {
    const expectedActionObject: CloseToastAction = {
      type: ToastActionConstants.CLOSE,
    };
    expect(actions.closeToastActionCreator()).toEqual(expectedActionObject);
  });
});
