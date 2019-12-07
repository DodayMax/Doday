import { DialogActionConstants, DialogActionTypes } from './actions';
import { DialogState } from '@doday/lib';

export const initialDialogState: DialogState = {
  open: false,
  title: '',
  actions: [],
};

export default (
  state = initialDialogState,
  action: DialogActionTypes
): DialogState => {
  switch (action.type) {
    case DialogActionConstants.OPEN:
      return {
        ...state,
        ...action.payload,
      };
    case DialogActionConstants.CLOSE:
      return initialDialogState;
    default:
      return state;
  }
};
