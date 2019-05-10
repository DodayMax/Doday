import { AnyAction } from 'redux';
import {
  SerializedActivity,
  SerializedActivityProgress,
  Activity,
} from '@root/lib/models/entities/Activity';
import { ActivityType } from '@root/lib/common-interfaces';
import { SerializedResource } from '@root/lib/models/entities/resource';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';

export enum ActionConstants {
  FETCH_ACTIVITIES_WITH_PROGRESS = '[activities] FETCH_ACTIVITIES_WITH_PROGRESS',
  SET_ACTIVITIES_IN_PROGRESS = '[activities] SET_ACTIVITIES_IN_PROGRESS',
  SET_COMPLETED_ACTIVITIES = '[activities] SET_COMPLETED_ACTIVITIES',
  FETCH_ACTIVITY_TYPES = '[activities] FETCH_ACTIVITY_TYPES',
  SET_ACTIVITY_TYPE = '[activities] SET_ACTIVITY_TYPE',
  CREATE_ACTIVITY = '[activities] CREATE_ACTIVITY',
  TAKE_ACTIVITY = '[activities] TAKE_ACTIVITY',
  CREATE_AND_TAKE_ACTIVITY = '[activities] CREATE_AND_TAKE_ACTIVITY',
  PARSE_URL = '[activities] PARSE_URL',
  SET_URL_PARSING_PROGRESS = '[activities] SET_URL_PARSING_PROGRESS',
  SET_PARSED_URL_METADATA_OBJECT = '[activities] SET_PARSED_URL_METADATA_OBJECT',
  CLEAR_PARSED_URL_METADATA = '[activities] CLEAR_PARSED_URL_METADATA',
  CLEAR_ACTIVITIES_BUILDER = '[activities] CLEAR_ACTIVITIES_BUILDER',
}

/**
 * Fetch activities with progress with params
 *
 * @export
 * @returns {FetchActivitiesWithProgressAction}
 */
export function fetchActivitiesWithProgressActionCreator(
  params?: DodaysWithProgressQueryParams
): FetchActivitiesWithProgressAction {
  return {
    type: ActionConstants.FETCH_ACTIVITIES_WITH_PROGRESS,
    payload: params,
  };
}

/**
 * Set activities in progress to store
 *
 * @export
 * @returns {SetActivitiesInProgressAction}
 */
export function setActivitiesInProgressActionCreator(
  activities: Activity[]
): SetActivitiesInProgressAction {
  return {
    type: ActionConstants.SET_ACTIVITIES_IN_PROGRESS,
    payload: activities,
  };
}

/**
 * Set completed activities to store
 *
 * @export
 * @returns {SetCompletedActivitiesAction}
 */
export function setCompletedActivitiesActionCreator(
  activities: Activity[]
): SetCompletedActivitiesAction {
  return {
    type: ActionConstants.SET_COMPLETED_ACTIVITIES,
    payload: activities,
  };
}

/**
 * Fetch activity types
 *
 * @export
 * @returns {FetchActivityTypesAction}
 */
export function fetchActivityTypesActionCreator(): FetchActivityTypesAction {
  return {
    type: ActionConstants.FETCH_ACTIVITY_TYPES,
  };
}

/**
 * Set activity type to store
 *
 * @export
 * @returns {SetActivityTypeAction}
 */
export function setActivityTypeActionCreator(
  type: ActivityType
): SetActivityTypeAction {
  return {
    type: ActionConstants.SET_ACTIVITY_TYPE,
    payload: type,
  };
}

/**
 * Create only Activity(Doday) node and relation to Hero
 *
 * @export
 * @returns {CreateActivityAction}
 */
export function createActivityActionCreator(
  doday: SerializedActivity,
  resource: SerializedResource
): CreateActivityAction {
  return {
    type: ActionConstants.CREATE_ACTIVITY,
    payload: {
      doday,
      resource,
    },
  };
}

/**
 * Take created(public or my own) Activity(Doday), create Progress
 * node and DOING, ORIGIN relations
 *
 * @export
 * @returns {TakeActivityAction}
 */
export function takeActivityActionCreator(
  dodayDID: string,
  progress: Partial<SerializedActivityProgress>
): TakeActivityAction {
  return {
    type: ActionConstants.TAKE_ACTIVITY,
    payload: {
      dodayDID,
      progress,
    },
  };
}

/**
 * Create new Activity(Doday)and ActivityProgress(Progress)
 * nodes and connect them to Hero
 *
 * @export
 * @returns {CreateAndTakeActivityAction}
 */
export function createAndTakeActivityActionCreator(
  doday: SerializedActivity,
  progress: SerializedActivityProgress
): CreateAndTakeActivityAction {
  return {
    type: ActionConstants.CREATE_AND_TAKE_ACTIVITY,
    payload: {
      doday,
      progress,
    },
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
 * @returns {ClearParsedUrlMetadataAction}
 */
export function clearParsedUrlMetadataActionCreator(): ClearParsedUrlMetadataAction {
  return {
    type: ActionConstants.CLEAR_PARSED_URL_METADATA,
  };
}

/**
 * Clear activities builder data from store
 *
 * @export
 * @returns {ClearActivitiesBuilderAction}
 */
export function clearActivitiesBuilderActionCreator(): ClearActivitiesBuilderAction {
  return {
    type: ActionConstants.CLEAR_ACTIVITIES_BUILDER,
  };
}

export const actionCreators = {
  fetchActivitiesWithProgressActionCreator,
  setActivitiesInProgressActionCreator,
  setCompletedActivitiesActionCreator,
  fetchActivityTypesActionCreator,
  setActivityTypeActionCreator,
  createActivityActionCreator,
  takeActivityActionCreator,
  createAndTakeActivityActionCreator,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  parseUrlMetadataActionCreator,
  clearParsedUrlMetadataActionCreator,
  clearActivitiesBuilderActionCreator,
};

/**
 * Define return types of actions
 */

export interface FetchActivitiesWithProgressAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITIES_WITH_PROGRESS;
  payload: DodaysWithProgressQueryParams;
}

export interface SetActivitiesInProgressAction extends AnyAction {
  type: ActionConstants.SET_ACTIVITIES_IN_PROGRESS;
  payload: Activity[];
}

export interface SetCompletedActivitiesAction extends AnyAction {
  type: ActionConstants.SET_COMPLETED_ACTIVITIES;
  payload: Activity[];
}

export interface FetchActivityTypesAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITY_TYPES;
}

export interface SetActivityTypeAction extends AnyAction {
  type: ActionConstants.SET_ACTIVITY_TYPE;
  payload: ActivityType;
}

export interface CreateActivityAction extends AnyAction {
  type: ActionConstants.CREATE_ACTIVITY;
  payload: {
    doday: SerializedActivity;
    resource: SerializedResource;
  };
}

export interface TakeActivityAction extends AnyAction {
  type: ActionConstants.TAKE_ACTIVITY;
  payload: {
    dodayDID: string;
    progress: Partial<SerializedActivityProgress>;
  };
}

export interface CreateAndTakeActivityAction extends AnyAction {
  type: ActionConstants.CREATE_AND_TAKE_ACTIVITY;
  payload: {
    doday: SerializedActivity;
    progress: SerializedActivityProgress;
  };
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

export interface ClearParsedUrlMetadataAction extends AnyAction {
  type: ActionConstants.CLEAR_PARSED_URL_METADATA;
}

export interface ClearActivitiesBuilderAction extends AnyAction {
  type: ActionConstants.CLEAR_ACTIVITIES_BUILDER;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | FetchActivitiesWithProgressAction
  | SetActivitiesInProgressAction
  | SetCompletedActivitiesAction
  | FetchActivityTypesAction
  | SetActivityTypeAction
  | CreateActivityAction
  | TakeActivityAction
  | CreateAndTakeActivityAction
  | ParseUrlMetadataAction
  | ParseUrlMetadataProgressAction
  | SetParsedUrlMetadataObjectAction
  | ClearParsedUrlMetadataAction
  | ClearActivitiesBuilderAction;
