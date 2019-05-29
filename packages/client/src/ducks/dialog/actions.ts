import { AnyAction } from 'redux';
import { DodayDialogProps } from '@root/components/shared';

export enum ActionConstants {
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
  payload: DodayDialogProps
): OpenDialogAction {
  return {
    type: ActionConstants.OPEN,
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
    type: ActionConstants.CLOSE,
  };
}

export const actionCreators = {
  openDialogActionCreator,
  closeDialogActionCreator,
};

/**
 * Define return types of actions
 */

export interface OpenDialogAction extends AnyAction {
  type: ActionConstants.OPEN;
  payload: DodayDialogProps;
}

export interface CloseDialogAction extends AnyAction {
  type: ActionConstants.CLOSE;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = OpenDialogAction | CloseDialogAction;
