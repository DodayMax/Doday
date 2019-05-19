import { AnyAction } from 'redux';

export enum ActionConstants {
  TOGGLE_DRAWER = '[heroSettings] TOGGLE_DRAWER',
  TOGGLE_DODAY_APP = '[heroSettings] TOGGLE_DODAY_APP',
}

/**
 * Toggle drawer
 *
 * @export
 * @returns {ToggleDrawerAction}
 */
export function toggleDrawerActionCreator(): ToggleDrawerAction {
  return {
    type: ActionConstants.TOGGLE_DRAWER,
  };
}

/**
 * Toggle Doday app
 *
 * @export
 * @returns {ToggleDodayAppAction}
 */
export function toggleDodayAppActionCreator(): ToggleDodayAppAction {
  return {
    type: ActionConstants.TOGGLE_DODAY_APP,
  };
}

export const actionCreators = {
  toggleDrawerActionCreator,
  toggleDodayAppActionCreator,
};

/**
 * Define return types of actions
 */

export interface ToggleDrawerAction extends AnyAction {
  type: ActionConstants.TOGGLE_DRAWER;
}

export interface ToggleDodayAppAction extends AnyAction {
  type: ActionConstants.TOGGLE_DODAY_APP;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = ToggleDrawerAction;
