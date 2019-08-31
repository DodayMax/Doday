import { AnyAction } from 'redux';

export enum BuilderActionConstants {
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
function setBuilderLoadingStateActionCreator(
  state: boolean
): SetBuilderLoadingStateAction {
  return {
    type: BuilderActionConstants.SET_BUILDER_LOADING_STATE,
    payload: state,
  };
}

/**
 * Clear all data in builder
 *
 * @export
 * @returns {ClearBuilderAction}
 */
function clearBuilderActionCreator(): ClearBuilderAction {
  return {
    type: BuilderActionConstants.CLEAR_BUILDER,
  };
}

export default {
  setBuilderLoadingStateActionCreator,
  clearBuilderActionCreator,
};

/**
 * Define return types of actions
 */

export interface SetBuilderLoadingStateAction extends AnyAction {
  type: BuilderActionConstants.SET_BUILDER_LOADING_STATE;
  payload: boolean;
}

export interface ClearBuilderAction extends AnyAction {
  type: BuilderActionConstants.CLEAR_BUILDER;
}

/**
 * Export all action types for reducers
 */

export type BuilderActionTypes =
  | SetBuilderLoadingStateAction
  | ClearBuilderAction;
