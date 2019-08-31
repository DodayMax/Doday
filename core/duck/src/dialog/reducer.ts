import * as actions from './actions';
import { DialogState } from '@lib/models';

export const initialDialogState: DialogState = {
  open: false,
  title: '',
  actions: [],
};

export default (
  state = initialDialogState,
  action?: actions.ActionTypes
): DialogState => {
  switch (action && action.type) {
    case actions.ActionConstants.OPEN:
      return {
        ...state,
        ...action.payload,
      };
    case actions.ActionConstants.CLOSE:
      return initialDialogState;
    default:
      return state;
  }
};
