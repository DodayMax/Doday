import { AnyAction } from 'redux';
import { SerializedResource } from '@root/lib/models/entities/resource';
import {
  SerializedDodayLike,
  SerializedProgressLike,
} from '@root/lib/models/entities/common';
import { DodaysQueryParams, DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';

export enum ActionConstants {
  FETCH_DODAYS = '[dodays-api] FETCH_DODAYS',
  FETCH_DODAY_BY_DID = '[dodays-api] FETCH_DODAY_BY_DID',
  FETCH_DODAYS_WITH_PROGRESS = '[dodays-api] FETCH_DODAYS_WITH_PROGRESS',
  FETCH_DODAYS_WITH_PROGRESS_BY_DID = '[dodays-api] FETCH_DODAYS_WITH_PROGRESS_BY_DID',
  CREATE_DODAY = '[dodays-api] CREATE_DODAY',
  TAKE_DODAY = '[dodays-api] TAKE_DODAY',
  CREATE_AND_TAKE_DODAY = '[dodays-api] CREATE_AND_TAKE_DODAY',
  UPDATE_DODAY = '[dodays-api] UPDATE_DODAY',
  UNTAKE_DODAY = '[dodays-api] UNTAKE_DODAY',
  DELETE_DODAY = '[dodays-api] DELETE_DODAY',
}

/**
 * Fetch dodays with query params
 *
 * @export
 * @returns {FetchDodaysAction}
 */
export function fetchDodaysActionCreator(params: DodaysQueryParams): FetchDodaysAction {
  return {
    type: ActionConstants.FETCH_DODAYS,
    payload: params,
  };
}

/**
 * Fetch dodays with progress nodes with query params
 *
 * @export
 * @returns {FetchDodaysWithProgressAction}
 */
export function fetchDodaysWithProgressActionCreator(params?: DodaysWithProgressQueryParams): FetchDodaysWithProgressAction {
  return {
    type: ActionConstants.FETCH_DODAYS_WITH_PROGRESS,
    payload: params,
  };
}

/**
 * Fetch doday node by DID
 *
 * @export
 * @returns {FetchDodayByDIDAction}
 */
export function fetchDodayByDIDActionCreator(did: string): FetchDodayByDIDAction {
  return {
    type: ActionConstants.FETCH_DODAY_BY_DID,
    payload: did,
  };
}

/**
 * Fetch doday with progress node by DID
 *
 * @export
 * @returns {FetchDodayWithProgressByDIDAction}
 */
export function fetchDodayWithProgressByDIDActionCreator(did: string): FetchDodayWithProgressByDIDAction {
  return {
    type: ActionConstants.FETCH_DODAYS_WITH_PROGRESS_BY_DID,
    payload: did,
  };
}

/**
 * Create only Doday node and relation to Hero
 *
 * @export
 * @returns {CreateDodayAction}
 */
export function createDodayActionCreator(
  doday: SerializedDodayLike,
  resource: SerializedResource
): CreateDodayAction {
  return {
    type: ActionConstants.CREATE_DODAY,
    payload: {
      doday,
      resource,
    },
  };
}

/**
 * Take created(public or my own) Doday, create Progress
 * node and DOING, ORIGIN relations
 *
 * @export
 * @returns {TakeDodayAction}
 */
export function takeDodayActionCreator(
  dodayDID: string,
  progress: Partial<SerializedProgressLike>
): TakeDodayAction {
  return {
    type: ActionConstants.TAKE_DODAY,
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
 * @returns {CreateAndTakeDodayAction}
 */
export function createAndTakeDodayActionCreator(
  doday: SerializedDodayLike,
  progress: SerializedProgressLike,
  resource?: SerializedResource
): CreateAndTakeDodayAction {
  return {
    type: ActionConstants.CREATE_AND_TAKE_DODAY,
    payload: {
      doday,
      progress,
      resource,
    },
  };
}

/**
 * Update Doday, Progress, Resource nodes
 *
 * @export
 * @returns {UpdateDodayAction}
 */
export function updateDodayActionCreator(
  doday: Partial<SerializedDodayLike>,
  progress: Partial<SerializedProgressLike>,
  resource?: Partial<SerializedResource>
): UpdateDodayAction {
  return {
    type: ActionConstants.UPDATE_DODAY,
    payload: {
      doday,
      progress,
      resource,
    },
  };
}

/**
 * Remove Progress node and relations for doday
 *
 * @export
 * @returns {UntakeDodayAction}
 */
export function untakeDodayActionCreator(dodayDID: string): UntakeDodayAction {
  return {
    type: ActionConstants.UNTAKE_DODAY,
    payload: dodayDID,
  };
}

/**
 * Remove Progress node and relations for doday
 *
 * @export
 * @returns {DeleteDodayAction}
 */
export function deleteDodayActionCreator(dodayDID: string): DeleteDodayAction {
  return {
    type: ActionConstants.DELETE_DODAY,
    payload: dodayDID,
  };
}

export const actionCreators = {
  createDodayActionCreator,
  takeDodayActionCreator,
  createAndTakeDodayActionCreator,
  updateDodayActionCreator,
  untakeDodayActionCreator,
  deleteDodayActionCreator,
};

/**
 * Define return types of actions
 */

export interface FetchDodaysAction extends AnyAction {
  type: ActionConstants.FETCH_DODAYS;
  payload: DodaysQueryParams;
}

export interface FetchDodaysWithProgressAction extends AnyAction {
  type: ActionConstants.FETCH_DODAYS_WITH_PROGRESS;
  payload?: DodaysWithProgressQueryParams;
}

export interface FetchDodayByDIDAction extends AnyAction {
  type: ActionConstants.FETCH_DODAY_BY_DID;
  payload: string;
}

export interface FetchDodayWithProgressByDIDAction extends AnyAction {
  type: ActionConstants.FETCH_DODAYS_WITH_PROGRESS_BY_DID;
  payload: string;
}

export interface CreateDodayAction extends AnyAction {
  type: ActionConstants.CREATE_DODAY;
  payload: {
    doday: SerializedDodayLike;
    resource: SerializedResource;
  };
}

export interface TakeDodayAction extends AnyAction {
  type: ActionConstants.TAKE_DODAY;
  payload: {
    dodayDID: string;
    progress: Partial<SerializedProgressLike>;
  };
}

export interface CreateAndTakeDodayAction extends AnyAction {
  type: ActionConstants.CREATE_AND_TAKE_DODAY;
  payload: {
    doday: SerializedDodayLike;
    progress: SerializedProgressLike;
    resource: SerializedResource;
  };
}

export interface UpdateDodayAction extends AnyAction {
  type: ActionConstants.UPDATE_DODAY;
  payload: {
    doday: Partial<SerializedDodayLike>;
    progress: Partial<SerializedProgressLike>;
    resource: Partial<SerializedResource>;
  };
}

export interface UntakeDodayAction extends AnyAction {
  type: ActionConstants.UNTAKE_DODAY;
  payload: string;
}

export interface DeleteDodayAction extends AnyAction {
  type: ActionConstants.DELETE_DODAY;
  payload: string;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | CreateDodayAction
  | TakeDodayAction
  | CreateAndTakeDodayAction
  | UpdateDodayAction
  | UntakeDodayAction
  | DeleteDodayAction;
