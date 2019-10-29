import { AnyAction } from 'redux';
import { ToastState } from '@doday/lib';

export enum ToastActionConstants {
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
    type: ToastActionConstants.OPEN,
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
    type: ToastActionConstants.CLOSE,
  };
}

export default {
  openToastActionCreator,
  closeToastActionCreator,
};

/**
 * Define return types of actions
 */

export interface OpenToastAction extends AnyAction {
  type: ToastActionConstants.OPEN;
  payload: ToastState;
}

export interface CloseToastAction extends AnyAction {
  type: ToastActionConstants.CLOSE;
}

/**
 * Export all action types for reducers
 */

export type ToastActionTypes = OpenToastAction | CloseToastAction;
