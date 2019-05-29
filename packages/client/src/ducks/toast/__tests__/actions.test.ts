import { ToastState } from '@root/lib/models';
import {
  OpenToastAction,
  ActionConstants,
  actionCreators,
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
      type: ActionConstants.OPEN,
      payload: options,
    };
    expect(actionCreators.openToastActionCreator(options)).toEqual(
      expectedActionObject
    );
  });

  it('close toast', () => {
    const expectedActionObject: CloseToastAction = {
      type: ActionConstants.CLOSE,
    };
    expect(actionCreators.closeToastActionCreator()).toEqual(
      expectedActionObject
    );
  });
});
