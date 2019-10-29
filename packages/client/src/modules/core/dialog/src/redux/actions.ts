import { AnyAction } from 'redux';
import { DialogState } from '@doday/lib';

export enum DialogActionConstants {
  OPEN = '[dialog] OPEN',
  CLOSE = '[dialog] CLOSE',
}

/**
 * Open Dialog
 *
 * @export
 * @returns {OpenDialogAction}
 */
export function openDialogActionCreator(
  payload: DialogState
): OpenDialogAction {
  return {
    type: DialogActionConstants.OPEN,
    payload,
  };
}

/**
 * Close Dialog
 *
 * @export
 * @returns {CloseDialogAction}
 */
export function closeDialogActionCreator(): CloseDialogAction {
  return {
    type: DialogActionConstants.CLOSE,
  };
}

export default {
  openDialogActionCreator,
  closeDialogActionCreator,
};

/**
 * Define return types of actions
 */

export interface OpenDialogAction extends AnyAction {
  type: DialogActionConstants.OPEN;
  payload: any;
}

export interface CloseDialogAction extends AnyAction {
  type: DialogActionConstants.CLOSE;
}

/**
 * Export all action types for reducers
 */

export type DialogActionTypes = OpenDialogAction | CloseDialogAction;
