import { AnyAction } from 'redux';

export enum ActionConstants {
  SET_BUILDER_LOADING_STATE = '[builder] SET_BUILDER_LOADING_STATE',
  SET_BUILDER_SUCCESS_FLAG = '[builder] SET_BUILDER_SUCCESS_FLAG',
  CLEAR_BUILDER = '[builder] CLEAR_BUILDER',
}

/**
 * Set loading state for builder
 *
 * @export
 * @returns {SetBuilderLoadingStateAction}
 */
export function setBuilderLoadingStateActionCreator(
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
export function setBuilderSuccessFlagActionCreator(
  state?: boolean
): SetBuilderSuccessFlagAction {
  return {
    type: ActionConstants.SET_BUILDER_SUCCESS_FLAG,
    payload: state,
  };
}

/**
 * Clear all data in builder
 *
 * @export
 * @returns {ClearBuilderAction}
 */
export function clearBuilderActionCreator(): ClearBuilderAction {
  return {
    type: ActionConstants.CLEAR_BUILDER,
  };
}

/**
 * Define return types of actions
 */

export interface SetBuilderLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_BUILDER_LOADING_STATE;
  payload: boolean;
}

export interface SetBuilderSuccessFlagAction extends AnyAction {
  type: ActionConstants.SET_BUILDER_SUCCESS_FLAG;
  payload?: boolean;
}

export interface ClearBuilderAction extends AnyAction {
  type: ActionConstants.CLEAR_BUILDER;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetBuilderLoadingStateAction
  | SetBuilderSuccessFlagAction
  | ClearBuilderAction;
