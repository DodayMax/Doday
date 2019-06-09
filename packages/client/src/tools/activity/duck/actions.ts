import { AnyAction } from 'redux';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';
import { ClearBuilderAction } from '@root/ducks/builder/actions';
import { Resource } from '@root/lib/models/entities/resource';
import { Activity, ActivityType } from '@root/lib/models/entities/activity';
import { DodayLike, ProgressLike } from '@root/lib/models/entities/common';

export enum ActionConstants {
  FETCH_ACTIVITIES = '[activities] FETCH_ACTIVITIES',
  SET_ACTIVITIES = '[activities] SET_ACTIVITIES',
  PARSE_URL = '[activities] PARSE_URL',
  SET_ACTIVITY_TYPE = '[activities] SET_ACTIVITY_TYPE',
  PIN_ACTIVITY = '[activities] PIN_ACTIVITY',
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
  params?: DodaysWithProgressQueryParams
): FetchActivitiesAction {
  return {
    type: ActionConstants.FETCH_ACTIVITIES,
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
 * @returns {SetParseUrlMetadataProgressAction}
 */
export function setUrlParsingProgressActionCreator(
  state?: boolean
): SetParseUrlMetadataProgressAction {
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
 * Pin activity
 *
 * @export
 * @returns {PinActivityAction}
 */
export function pinActivityActionCreator(value: boolean): PinActivityAction {
  return {
    type: ActionConstants.PIN_ACTIVITY,
    payload: value,
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
 * Add new Doday to Activity's beacon dodays
 *
 * @export
 * @returns {CreateDodayOptimisticUpdateAction}
 */
export function createDodayOptimisticUpdateActionCreator(payload: {
  doday: DodayLike;
  progress?: ProgressLike;
  resource?: Resource;
}): CreateDodayOptimisticUpdateAction {
  return {
    type: ActionConstants.CREATE_DODAY_OPTIMISTIC_UPDATE,
    payload,
  };
}

/**
 * Update Doday in Activity's beacon dodays
 *
 * @export
 * @returns {UpdateDodayOptimisticUpdateAction}
 */
export function updateDodayOptimisticUpdateActionCreator(payload: {
  did: string;
  updates: {
    doday?: Partial<DodayLike>;
    progress?: Partial<ProgressLike>;
    resource?: Partial<Resource>;
  };
}): UpdateDodayOptimisticUpdateAction {
  return {
    type: ActionConstants.UPDATE_DODAY_OPTIMISTIC_UPDATE,
    payload,
  };
}

/**
 * Take Doday side effect in Activity's beacon dodays
 *
 * @export
 * @returns {TakeDodayOptimisticUpdateAction}
 */
export function takeDodayOptimisticUpdateActionCreator(payload: {
  doday: Activity;
  progress: Partial<ProgressLike>;
}): TakeDodayOptimisticUpdateAction {
  return {
    type: ActionConstants.TAKE_DODAY_OPTIMISTIC_UPDATE,
    payload,
  };
}

/**
 * Untake Doday side effect in Activity's beacon dodays
 *
 * @export
 * @returns {UntakeDodayOptimisticUpdateAction}
 */
export function untakeDodayOptimisticUpdateActionCreator(
  did: string
): UntakeDodayOptimisticUpdateAction {
  return {
    type: ActionConstants.UNTAKE_DODAY_OPTIMISTIC_UPDATE,
    payload: did,
  };
}

/**
 * Delete Doday side effect in Activity's beacon dodays
 *
 * @export
 * @returns {DeleteDodayOptimisticUpdateAction}
 */
export function deleteDodayOptimisticUpdateActionCreator(
  did: string
): DeleteDodayOptimisticUpdateAction {
  return {
    type: ActionConstants.DELETE_DODAY_OPTIMISTIC_UPDATE,
    payload: did,
  };
}

export const actionCreators = {
  fetchActivitiesActionCreator,
  setActivitiesActionCreator,
  setActivityTypeActionCreator,
  pinActivityActionCreator,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  parseUrlMetadataActionCreator,
  clearParsedUrlMetadataActionCreator,
};

export const optimisticUpdatesActionCreators = {
  createDodayOptimisticUpdateActionCreator,
  updateDodayOptimisticUpdateActionCreator,
  takeDodayOptimisticUpdateActionCreator,
  untakeDodayOptimisticUpdateActionCreator,
  deleteDodayOptimisticUpdateActionCreator,
};

/**
 * Define return types of actions
 */

export interface FetchActivitiesAction extends AnyAction {
  type: ActionConstants.FETCH_ACTIVITIES;
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

export interface PinActivityAction extends AnyAction {
  type: ActionConstants.PIN_ACTIVITY;
  payload: boolean;
}

export interface SetParseUrlMetadataProgressAction extends AnyAction {
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
    doday: DodayLike;
    progress?: ProgressLike;
    resource?: Resource;
  };
}

export interface UpdateDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.UPDATE_DODAY_OPTIMISTIC_UPDATE;
  payload: {
    did: string;
    updates: {
      doday?: Partial<DodayLike>;
      progress?: Partial<ProgressLike>;
      resource?: Partial<Resource>;
    };
  };
}

export interface TakeDodayOptimisticUpdateAction extends AnyAction {
  type: ActionConstants.TAKE_DODAY_OPTIMISTIC_UPDATE;
  payload: {
    doday: Activity;
    progress: Partial<ProgressLike>;
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
  | SetActivitiesAction
  | SetActivityTypeAction
  | PinActivityAction
  | ParseUrlMetadataAction
  | SetParseUrlMetadataProgressAction
  | SetParsedUrlMetadataObjectAction
  | ClearParsedUrlMetadataAction
  | ClearBuilderAction
  | CreateDodayOptimisticUpdateAction
  | UpdateDodayOptimisticUpdateAction
  | TakeDodayOptimisticUpdateAction
  | UntakeDodayOptimisticUpdateAction
  | DeleteDodayOptimisticUpdateAction;
