import * as actions from './actions';
import { ToastState } from '@lib/models';

export const initialToastState: ToastState = {
  open: false,
  type: 'success',
  messages: [],
  autoHideDuration: 3000,
};

export default (
  state = initialToastState,
  action?: actions.ActionTypes
): ToastState => {
  switch (action && action.type) {
    case actions.ActionConstants.OPEN:
      return {
        ...state,
        ...action.payload,
      };
    case actions.ActionConstants.CLOSE:
      return {
        ...state,
        messages: [],
        open: false,
      };
    default:
      return state;
  }
};
