import { AnyAction } from 'redux';
import { ActivityType } from '@root/lib/common-interfaces';
import { SerializedDoday } from '@root/lib/models/entities/Doday';

export enum ActionConstants {
  FETCH_ACTIVITY_TYPES = '[builder] FETCH_ACTIVITY_TYPES',
  SET_ACTIVITY_TYPES = '[builder] SET_ACTIVITY_TYPES',
  CREATE_AND_TAKE_DODAY = '[builder] CREATE_AND_TAKE_DODAY',
  SET_BUILDER_LOADING_STATE = '[builder] SET_BUILDER_LOADING_STATE',
  SET_BUILDER_SUCCESS_FLAG = '[builder] SET_BUILDER_SUCCESS_FLAG',
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
 * Create new Doday and Progress nodes and connect them to Hero
 *
 * @export
 * @returns {CreateAndTakeDodayAction}
 */
export function createAndTakeDoday(
  doday: SerializedDoday
): CreateAndTakeDodayAction {
  return {
    type: ActionConstants.CREATE_AND_TAKE_DODAY,
    payload: doday,
  };
}

/**
 * Set activity types to store
 *
 * @export
 * @returns {SetActivityTypesAction}
 */
export function setActivityTypes(
  types: ActivityType[]
): SetActivityTypesAction {
  return {
    type: ActionConstants.SET_ACTIVITY_TYPES,
    payload: types,
  };
}

/**
 * Set loading state for builder
 *
 * @export
 * @returns {SetBuilderLoadingStateAction}
 */
export function setBuilderLoadingState(
  state: boolean
): SetBuilderLoadingStateAction {
  return {
    type: ActionConstants.SET_BUILDER_LOADING_STATE,
    payload: state,
  };
}

/**
 * Set success flag for builder to close after creation
 *
 * @export
 * @returns {SetBuilderSuccessFlagAction}
 */
export function setBuilderSuccessFlag(
  state?: boolean
): SetBuilderSuccessFlagAction {
  return {
    type: ActionConstants.SET_BUILDER_SUCCESS_FLAG,
    payload: state,
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

export interface CreateAndTakeDodayAction extends AnyAction {
  type: ActionConstants.CREATE_AND_TAKE_DODAY;
  payload: SerializedDoday;
}

export interface SetBuilderLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_BUILDER_LOADING_STATE;
  payload: boolean;
}

export interface SetBuilderSuccessFlagAction extends AnyAction {
  type: ActionConstants.SET_BUILDER_SUCCESS_FLAG;
  payload?: boolean;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | FetchActivityTypesAction
  | SetActivityTypesAction
  | CreateAndTakeDodayAction
  | SetBuilderLoadingStateAction
  | SetBuilderSuccessFlagAction;
