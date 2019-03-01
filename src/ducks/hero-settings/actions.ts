import { AnyAction } from 'redux';

export enum ActionConstants {
  TOGGLE_DRAWER = '[heroSettings] TOGGLE_DRAWER',
  CHANGE_DATE = '[heroSettings] CHANGE_DATE',
}

/**
 * Toggle drawer
 *
 * @export
 * @returns {ToggleDrawerAction}
 */
export function toggleDrawer(): ToggleDrawerAction {
  return {
    type: ActionConstants.TOGGLE_DRAWER,
  };
}

/**
 * Change date in doday app today section
 *
 * @export
 * @returns {ChangeDateAction}
 */
export function changeDate(date: Date): ChangeDateAction {
  return {
    type: ActionConstants.CHANGE_DATE,
    payload: date,
  };
}

/**
 * Define return types of actions
 */

export interface ToggleDrawerAction extends AnyAction {
  type: ActionConstants.TOGGLE_DRAWER;
}

export interface ChangeDateAction extends AnyAction {
  type: ActionConstants.CHANGE_DATE;
  payload: Date;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = ToggleDrawerAction
  | ChangeDateAction;