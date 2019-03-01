import { AnyAction } from 'redux';

export enum ActionConstants {
  CHANGE_PATH = '[doday-app] CHANGE_PATH',
}

/**
 * Go to path
 *
 * @export
 * @returns {DodayAppAction}
 */
export function changePath(path): DodayAppAction {
  return {
    type: ActionConstants.CHANGE_PATH,
    payload: path
  };
}

/**
 * Define return types of actions
 */

export interface DodayAppAction extends AnyAction {
  type: ActionConstants.CHANGE_PATH;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = DodayAppAction;