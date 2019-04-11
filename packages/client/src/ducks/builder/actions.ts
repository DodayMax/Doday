import { AnyAction } from 'redux';
import { Activity } from '@root/lib/common-interfaces';
import { SerializedDoday } from '@root/lib/models/entities/Doday';
import { SerializedGoal, Goal } from '@root/lib/models/entities/Goal';

export enum ActionConstants {
  FETCH_ACTIVITY_TYPES = '[builder] FETCH_ACTIVITY_TYPES',
  SET_ACTIVITY_TYPE = '[builder] SET_ACTIVITY_TYPE',
  CREATE_AND_TAKE_DODAY = '[builder] CREATE_AND_TAKE_DODAY',
  CREATE_GOAL = '[builder] CREATE_GOAL',
  SET_BUILDER_LOADING_STATE = '[builder] SET_BUILDER_LOADING_STATE',
  SET_BUILDER_SUCCESS_FLAG = '[builder] SET_BUILDER_SUCCESS_FLAG',
  PARSE_URL = '[builder] PARSE_URL',
  SET_URL_PARSING_PROGRESS = '[builder] SET_URL_PARSING_PROGRESS',
  SET_PARSED_URL_METADATA_OBJECT = '[builder] SET_PARSED_URL_METADATA_OBJECT',
  CLEAR_PARSED_METADATA = '[builder] CLEAR_PARSED_METADATA',
  CLEAR_BUILDER = '[builder] CLEAR_BUILDER',
  SELECT_GOAL = '[builder] SELECT_GOAL',
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
 * Create new Goal node and connect it to Hero
 *
 * @export
 * @returns {CreateGoalAction}
 */
export function createGoalActionCreator(
  goal: SerializedGoal
): CreateGoalAction {
  return {
    type: ActionConstants.CREATE_GOAL,
    payload: goal,
  };
}

/**
 * Set activity type to store
 *
 * @export
 * @returns {SetActivityTypeAction}
 */
export function setActivityTypeActionCreator(
  type: Activity
): SetActivityTypeAction {
  return {
    type: ActionConstants.SET_ACTIVITY_TYPE,
    payload: type,
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
 * Set url parsing progress state
 *
 * @export
 * @returns {ParseUrlMetadataProgressAction}
 */
export function setUrlParsingProgressActionCreator(
  state?: boolean
): ParseUrlMetadataProgressAction {
  return {
    type: ActionConstants.SET_URL_PARSING_PROGRESS,
    payload: state,
  };
}

/**
 * Set parsed url object
 *
 * @export
 * @returns {SetParsedUrlMetadataObjectAction}
 */
export function setParsedUrlMetadataObjectActionCreator(
  metadata: any
): SetParsedUrlMetadataObjectAction {
  return {
    type: ActionConstants.SET_PARSED_URL_METADATA_OBJECT,
    payload: metadata,
  };
}

/**
 * Parse url metadata
 *
 * @export
 * @returns {ParseUrlMetadataAction}
 */
export function parseUrlMetadataActionCreator(
  url: string
): ParseUrlMetadataAction {
  return {
    type: ActionConstants.PARSE_URL,
    payload: url,
  };
}

/**
 * Clear parsed metadata from store
 *
 * @export
 * @returns {ClearParsedMetadataAction}
 */
export function clearParsedMetadataActionCreator(): ClearParsedMetadataAction {
  return {
    type: ActionConstants.CLEAR_PARSED_METADATA,
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
 * Select goal in builder
 *
 * @export
 * @returns {SelectGoalAction}
 */
export function selectGoalActionCreator(goal: Goal): SelectGoalAction {
  return {
    type: ActionConstants.SELECT_GOAL,
    payload: goal,
  };
}

/**
 * Define return types of actions
 */

export interface FetchActivityTypesAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITY_TYPES;
}

export interface SetActivityTypeAction extends AnyAction {
  type: ActionConstants.SET_ACTIVITY_TYPE;
  payload: Activity;
}

export interface CreateAndTakeDodayAction extends AnyAction {
  type: ActionConstants.CREATE_AND_TAKE_DODAY;
  payload: SerializedDoday;
}

export interface CreateGoalAction extends AnyAction {
  type: ActionConstants.CREATE_GOAL;
  payload: SerializedGoal;
}

export interface SetBuilderLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_BUILDER_LOADING_STATE;
  payload: boolean;
}

export interface SetBuilderSuccessFlagAction extends AnyAction {
  type: ActionConstants.SET_BUILDER_SUCCESS_FLAG;
  payload?: boolean;
}

export interface ParseUrlMetadataAction extends AnyAction {
  type: ActionConstants.PARSE_URL;
  payload: string;
}

export interface ParseUrlMetadataProgressAction extends AnyAction {
  type: ActionConstants.SET_URL_PARSING_PROGRESS;
  payload?: boolean;
}

export interface SetParsedUrlMetadataObjectAction extends AnyAction {
  type: ActionConstants.SET_PARSED_URL_METADATA_OBJECT;
  payload: any;
}

export interface ClearParsedMetadataAction extends AnyAction {
  type: ActionConstants.CLEAR_PARSED_METADATA;
}

export interface ClearBuilderAction extends AnyAction {
  type: ActionConstants.CLEAR_BUILDER;
}

export interface SelectGoalAction extends AnyAction {
  type: ActionConstants.SELECT_GOAL;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | FetchActivityTypesAction
  | SetActivityTypeAction
  | CreateAndTakeDodayAction
  | SetBuilderLoadingStateAction
  | SetBuilderSuccessFlagAction
  | ParseUrlMetadataAction
  | ParseUrlMetadataProgressAction
  | SetParsedUrlMetadataObjectAction
  | ClearParsedMetadataAction
  | ClearBuilderAction
  | SelectGoalAction;
