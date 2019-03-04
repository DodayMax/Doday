import { AnyAction } from 'redux';

export enum ActionConstants {
  TOGGLE_DRAWER = '[heroSettings] TOGGLE_DRAWER',
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
 * Define return types of actions
 */

export interface ToggleDrawerAction extends AnyAction {
  type: ActionConstants.TOGGLE_DRAWER;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = ToggleDrawerAction;