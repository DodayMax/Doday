import { AnyAction } from 'redux';
import { Activity } from '@root/lib/models/entities/Activity';
import { ActivityType } from '@root/lib/common-interfaces';
import {
  DodaysWithProgressQueryParams,
  DodaysQueryParams,
} from '@root/services/api/dodays/queries';
import { ClearBuilderAction } from '@root/ducks/builder/actions';
import {
  DodayLike,
  ProgressLike,
  SerializedDodayLike,
  SerializedProgressLike,
} from '@root/lib/models/entities/common';
import {
  Resource,
  SerializedResource,
} from '@root/lib/models/entities/resource';

export enum ActionConstants {
  FETCH_ACTIVITIES = '[activities] FETCH_ACTIVITIES',
  FETCH_ACTIVITIES_WITH_PROGRESS = '[activities] FETCH_ACTIVITIES_WITH_PROGRESS',
  SET_ACTIVITIES = '[activities] SET_ACTIVITIES',
  PARSE_URL = '[activities] PARSE_URL',
  SET_ACTIVITY_TYPE = '[activities] SET_ACTIVITY_TYPE',
  SET_URL_PARSING_PROGRESS = '[activities] SET_URL_PARSING_PROGRESS',
  SET_PARSED_URL_METADATA_OBJECT = '[activities] SET_PARSED_URL_METADATA_OBJECT',
  CLEAR_PARSED_URL_METADATA = '[activities] CLEAR_PARSED_URL_METADATA',
  CLEAR_ACTIVITIES_BUILDER = '[activities] CLEAR_ACTIVITIES_BUILDER',
  CREATE_DODAY_OPTIMISTIC_UPDATE = '[activities-side-effect] CREATE_DODAY_OPTIMISTIC_UPDATE',
  UPDATE_DODAY_OPTIMISTIC_UPDATE = '[activities-side-effect] UPDATE_DODAY_OPTIMISTIC_UPDATE',
  TAKE_DODAY_OPTIMISTIC_UPDATE = '[activities-side-effect] TAKE_DODAY_OPTIMISTIC_UPDATE',
  UNTAKE_DODAY_OPTIMISTIC_UPDATE = '[activities-side-effect] UNTAKE_DODAY_OPTIMISTIC_UPDATE',
  DELETE_DODAY_OPTIMISTIC_UPDATE = '[activities-side-effect] DELETE_DODAY_OPTIMISTIC_UPDATE',
}

/**
 * Fetch activities with params
 *
 * @export
 * @returns {FetchActivitiesAction}
 */
export function fetchActivitiesActionCreator(
  params?: DodaysQueryParams
): FetchActivitiesAction {
  return {
    type: ActionConstants.FETCH_ACTIVITIES,
    payload: params,
  };
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
 * @returns {SetActivitiesAction}
 */
export function setActivitiesActionCreator(
  activities: Activity[]
): SetActivitiesAction {
  return {
    type: ActionConstants.SET_ACTIVITIES,
    payload: activities,
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

//////////////////////////////////////////////////////////

/** Side effects */

/**
 * Clear parsed metadata from store
 *
 * @export
 * @returns {CreateDodayOptimisticUpdateAction}
 */
export function createDodayOptimisticUpdateActionCreator(payload: {
  doday: SerializedDodayLike;
  progress?: SerializedProgressLike;
  resource?: SerializedResource;
}): CreateDodayOptimisticUpdateAction {
  return {
    type: ActionConstants.CREATE_DODAY_OPTIMISTIC_UPDATE,
    payload,
  };
}

export const actionCreators = {
  fetchActivitiesActionCreator,
  fetchActivitiesWithProgressActionCreator,
  setActivitiesActionCreator,
  setActivityTypeActionCreator,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  parseUrlMetadataActionCreator,
  clearParsedUrlMetadataActionCreator,
};

export const optimisticUpdatesActionCreators = {
  createDodayOptimisticUpdateActionCreator,
};

/**
 * Define return types of actions
 */

export interface FetchActivitiesAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITIES;
  payload: DodaysQueryParams;
}

export interface FetchActivitiesWithProgressAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITIES_WITH_PROGRESS;
  payload: DodaysWithProgressQueryParams;
}

export interface SetActivitiesAction extends AnyAction {
  type: ActionConstants.SET_ACTIVITIES;
  payload: Activity[];
}

export interface ParseUrlMetadataAction extends AnyAction {
  type: ActionConstants.PARSE_URL;
  payload: string;
}

export interface SetActivityTypeAction extends AnyAction {
  type: ActionConstants.SET_ACTIVITY_TYPE;
  payload: ActivityType;
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

/** Side effects */

export interface CreateDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.CREATE_DODAY_OPTIMISTIC_UPDATE;
  payload: {
    doday: SerializedDodayLike;
    progress?: SerializedProgressLike;
    resource?: SerializedResource;
  };
}

export interface UpdateDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.UPDATE_DODAY_OPTIMISTIC_UPDATE;
  payload: {
    doday: Partial<SerializedDodayLike>;
    progress?: Partial<SerializedProgressLike>;
    resource?: Partial<SerializedResource>;
  };
}

export interface TakeDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.TAKE_DODAY_OPTIMISTIC_UPDATE;
  payload: {
    doday: Partial<SerializedDodayLike>;
    progress?: Partial<SerializedProgressLike>;
    resource?: Partial<SerializedResource>;
  };
}

export interface UntakeDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.UNTAKE_DODAY_OPTIMISTIC_UPDATE;
  payload: string;
}

export interface DeleteDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.DELETE_DODAY_OPTIMISTIC_UPDATE;
  payload: string;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | FetchActivitiesAction
  | FetchActivitiesWithProgressAction
  | SetActivitiesAction
  | SetActivityTypeAction
  | ParseUrlMetadataAction
  | ParseUrlMetadataProgressAction
  | SetParsedUrlMetadataObjectAction
  | ClearParsedUrlMetadataAction
  | ClearBuilderAction
  | CreateDodayOptimisticUpdateAction
  | UpdateDodayOptimisticUpdateAction
  | TakeDodayOptimisticUpdateAction
  | UntakeDodayOptimisticUpdateAction
  | DeleteDodayOptimisticUpdateAction;
