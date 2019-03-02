import { AnyAction } from 'redux';
import { Doday } from '@root/lib/common-interfaces';

export enum ActionConstants {
  CHANGE_PATH = '[doday-app] CHANGE_PATH',
  PUSH_TO_NAV_STACK = '[doday-app] PUSH_TO_NAV_STACK',
  POP_FROM_NAV_STACK = '[doday-app] POP_FROM_NAV_STACK',
}

/**
 * Go to path
 *
 * @export
 * @returns {ChangePathAction}
 */
export function changePath(path): ChangePathAction {
  return {
    type: ActionConstants.CHANGE_PATH,
    payload: path,
  };
}

/**
 * Push Doday with children to navigation stack
 *
 * @export
 * @returns {PushToNavigationStackAction}
 */
export function pushToNavStack(doday: Doday): PushToNavigationStackAction {
  return {
    type: ActionConstants.PUSH_TO_NAV_STACK,
    payload: doday,
  };
}

/**
 * Pop from navigation stack
 *
 * @export
 * @returns {PopFromNavigationStackAction}
 */
export function popFromNavStack(): PopFromNavigationStackAction {
  return {
    type: ActionConstants.POP_FROM_NAV_STACK,
  };
}

/**
 * Define return types of actions
 */

export interface ChangePathAction extends AnyAction {
  type: ActionConstants.CHANGE_PATH;
}

export interface PushToNavigationStackAction extends AnyAction {
  type: ActionConstants.PUSH_TO_NAV_STACK;
}

export interface PopFromNavigationStackAction extends AnyAction {
  type: ActionConstants.POP_FROM_NAV_STACK;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = ChangePathAction
  | PushToNavigationStackAction
  | PopFromNavigationStackAction;