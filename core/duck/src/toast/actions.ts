import { AnyAction } from 'redux';
import { ToastState } from '@root/lib/models';

export enum ActionConstants {
  OPEN = '[toast] OPEN',
  CLOSE = '[toast] CLOSE',
}

/**
 * Open toast
 *
 * @export
 * @returns {OpenToastAction}
 */
export function openToastActionCreator(options: ToastState): OpenToastAction {
  return {
    type: ActionConstants.OPEN,
    payload: options,
  };
}

/**
 * Close toast
 *
 * @export
 * @returns {CloseToastAction}
 */
export function closeToastActionCreator(): CloseToastAction {
  return {
    type: ActionConstants.CLOSE,
  };
}

export const actionCreators = {
  openToastActionCreator,
  closeToastActionCreator,
};

/**
 * Define return types of actions
 */

export interface OpenToastAction extends AnyAction {
  type: ActionConstants.OPEN;
  payload: ToastState;
}

export interface CloseToastAction extends AnyAction {
  type: ActionConstants.CLOSE;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = OpenToastAction | CloseToastAction;
