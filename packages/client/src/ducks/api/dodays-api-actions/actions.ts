import { AnyAction } from 'redux';
import { SerializedResource } from '@root/lib/models/entities/resource';
import {
  SerializedDodayLike,
  SerializedProgressLike,
  DodayType,
} from '@root/tools/types';

export enum ActionConstants {
  CREATE_DODAY = '[dodays-api] CREATE_DODAY',
  CREATE_AND_TAKE_DODAY = '[dodays-api] CREATE_AND_TAKE_DODAY',
  TAKE_DODAY = '[dodays-api] TAKE_DODAY',
  UPDATE_DODAY = '[dodays-api] UPDATE_DODAY',
  UNTAKE_DODAY = '[dodays-api] UNTAKE_DODAY',
  DELETE_DODAY = '[dodays-api] DELETE_DODAY',
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
 * Create new Activity(Doday)and ActivityProgress(Progress)
 * nodes and connect them to Hero
 *
 * @export
 * @returns {CreateAndTakeDodayAction}
 */
export function createAndTakeDodayActionCreator(payload: {
  doday: SerializedDodayLike;
  progress: SerializedProgressLike;
  resource?: SerializedResource;
}): CreateAndTakeDodayAction {
  return {
    type: ActionConstants.CREATE_AND_TAKE_DODAY,
    payload,
  };
}

/**
 * Take created(public or my own) Doday, create Progress
 * node and DOING, ORIGIN relations
 *
 * @export
 * @returns {TakeDodayAction}
 */
export function takeDodayActionCreator(payload: {
  did: string;
  type: DodayType;
  progress: Partial<SerializedProgressLike>;
}): TakeDodayAction {
  return {
    type: ActionConstants.TAKE_DODAY,
    payload,
  };
}

/**
 * Update Doday, Progress, Resource nodes
 *
 * @export
 * @returns {UpdateDodayAction}
 */
export function updateDodayActionCreator(
  did: string,
  type: DodayType,
  updates: {
    doday?: Partial<SerializedDodayLike>;
    progress?: Partial<SerializedProgressLike>;
    resource?: Partial<SerializedResource>;
  }
): UpdateDodayAction {
  return {
    type: ActionConstants.UPDATE_DODAY,
    payload: {
      did,
      type,
      updates,
    },
  };
}

/**
 * Remove Progress node and relations for doday
 *
 * @export
 * @returns {UntakeDodayAction}
 */
export function untakeDodayActionCreator(payload: {
  did: string;
  type: DodayType;
}): UntakeDodayAction {
  return {
    type: ActionConstants.UNTAKE_DODAY,
    payload,
  };
}

/**
 * Remove Progress node and relations for doday
 *
 * @export
 * @returns {DeleteDodayAction}
 */
export function deleteDodayActionCreator(payload: {
  did: string;
  type: DodayType;
}): DeleteDodayAction {
  return {
    type: ActionConstants.DELETE_DODAY,
    payload,
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
    did: string;
    type: DodayType;
    progress: Partial<SerializedProgressLike>;
  };
}

export interface CreateAndTakeDodayAction extends AnyAction {
  type: ActionConstants.CREATE_AND_TAKE_DODAY;
  payload: {
    doday: SerializedDodayLike;
    progress: SerializedProgressLike;
    resource?: SerializedResource;
  };
}

export interface UpdateDodayAction extends AnyAction {
  type: ActionConstants.UPDATE_DODAY;
  payload: {
    did: string;
    type: DodayType;
    updates: {
      doday?: Partial<SerializedDodayLike>;
      progress?: Partial<SerializedProgressLike>;
      resource?: Partial<SerializedResource>;
    };
  };
}

export interface UntakeDodayAction extends AnyAction {
  type: ActionConstants.UNTAKE_DODAY;
  payload: {
    did: string;
    type: DodayType;
  };
}

export interface DeleteDodayAction extends AnyAction {
  type: ActionConstants.DELETE_DODAY;
  payload: {
    did: string;
    type: DodayType;
  };
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | CreateDodayAction
  | CreateAndTakeDodayAction
  | TakeDodayAction
  | UpdateDodayAction
  | UntakeDodayAction
  | DeleteDodayAction;
