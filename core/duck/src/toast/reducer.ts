import { ToastActionConstants, ToastActionTypes } from './actions';
import { ToastState } from '@doday/lib';

export const initialToastState: ToastState = {
  open: false,
  type: 'success',
  messages: [],
  autoHideDuration: 3000,
};

export default (
  state = initialToastState,
  action: ToastActionTypes
): ToastState => {
  switch (action.type) {
    case ToastActionConstants.OPEN:
      return {
        ...state,
        ...action.payload,
      };
    case ToastActionConstants.CLOSE:
      return {
        ...state,
        messages: [],
        open: false,
      };
    default:
      return state;
  }
};
