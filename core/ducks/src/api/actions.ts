import { AnyAction } from 'redux';
import { Resource, DodayLike, ProgressLike, DodayType } from '@doday/lib';

export enum APIActionConstants {
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
export function createDodayActionCreator(payload: {
  doday: DodayLike;
  resource: Resource;
}): CreateDodayAction {
  return {
    type: APIActionConstants.CREATE_DODAY,
    payload,
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
  doday: DodayLike;
  progress: ProgressLike;
  resource?: Resource;
}): CreateAndTakeDodayAction {
  return {
    type: APIActionConstants.CREATE_AND_TAKE_DODAY,
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
  doday: DodayLike;
  progress: Partial<ProgressLike>;
}): TakeDodayAction {
  return {
    type: APIActionConstants.TAKE_DODAY,
    payload,
  };
}

/**
 * Update Doday, Progress, Resource nodes
 *
 * @export
 * @returns {UpdateDodayAction}
 */
export function updateDodayActionCreator(payload: {
  did: string;
  type: DodayType;
  updates: {
    doday?: Partial<DodayLike>;
    progress?: Partial<ProgressLike>;
    resource?: Partial<Resource>;
  };
}): UpdateDodayAction {
  return {
    type: APIActionConstants.UPDATE_DODAY,
    payload,
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
    type: APIActionConstants.UNTAKE_DODAY,
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
    type: APIActionConstants.DELETE_DODAY,
    payload,
  };
}

export default {
  createDodayActionCreator,
  takeDodayActionCreator,
  createAndTakeDodayActionCreator,
  updateDodayActionCreator,
  untakeDodayActionCreator,
  deleteDodayActionCreator,
};

export interface CreateDodayAction extends AnyAction {
  type: APIActionConstants.CREATE_DODAY;
  payload: {
    doday: DodayLike;
    resource?: Resource;
  };
}

export interface TakeDodayAction extends AnyAction {
  type: APIActionConstants.TAKE_DODAY;
  payload: {
    doday: DodayLike;
    progress: Partial<ProgressLike>;
  };
}

export interface CreateAndTakeDodayAction extends AnyAction {
  type: APIActionConstants.CREATE_AND_TAKE_DODAY;
  payload: {
    doday: DodayLike;
    progress: ProgressLike;
    resource?: Resource;
  };
}

export interface UpdateDodayAction extends AnyAction {
  type: APIActionConstants.UPDATE_DODAY;
  payload: {
    did: string;
    type: DodayType;
    updates: {
      doday?: Partial<DodayLike>;
      progress?: Partial<ProgressLike>;
      resource?: Partial<Resource>;
    };
  };
}

export interface UntakeDodayAction extends AnyAction {
  type: APIActionConstants.UNTAKE_DODAY;
  payload: {
    did: string;
    type: DodayType;
  };
}

export interface DeleteDodayAction extends AnyAction {
  type: APIActionConstants.DELETE_DODAY;
  payload: {
    did: string;
    type: DodayType;
  };
}

/**
 * Export all action types for reducers
 */

export type APIActionTypes =
  | CreateDodayAction
  | CreateAndTakeDodayAction
  | TakeDodayAction
  | UpdateDodayAction
  | UntakeDodayAction
  | DeleteDodayAction;
