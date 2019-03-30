import { AnyAction } from 'redux';
import { ActivityType } from '@root/lib/common-interfaces';

export enum ActionConstants {
  FETCH_ACTIVITY_TYPES = '[builder] FETCH_ACTIVITY_TYPES',
  SET_ACTIVITY_TYPES = '[builder] SET_ACTIVITY_TYPES',
}

/**
 * Fetch activity types
 *
 * @export
 * @returns {FetchActivityTypesAction}
 */
export function fetchActivityTypes(): FetchActivityTypesAction {
  return {
    type: ActionConstants.FETCH_ACTIVITY_TYPES,
  };
}

/**
 * Set activity types to store
 *
 * @export
 * @returns {SetActivityTypesAction}
 */
export function setActivityTypes(types: ActivityType[]): SetActivityTypesAction {
  return {
    type: ActionConstants.SET_ACTIVITY_TYPES,
    payload: types
  };
}

/**
 * Define return types of actions
 */

export interface FetchActivityTypesAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITY_TYPES;
}

export interface SetActivityTypesAction extends AnyAction {
  type: ActionConstants.SET_ACTIVITY_TYPES;
  payload: ActivityType[];
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = FetchActivityTypesAction
  | SetActivityTypesAction;