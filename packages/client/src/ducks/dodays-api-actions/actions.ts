import { AnyAction } from 'redux';
import { SerializedResource } from '@root/lib/models/entities/resource';
import {
  SerializedDodayLike,
  SerializedProgressLike,
} from '@root/lib/models/entities/common';

export enum ActionConstants {
  CREATE_DODAY = '[dodays-api] CREATE_DODAY',
  TAKE_DODAY = '[dodays-api] TAKE_DODAY',
  CREATE_AND_TAKE_DODAY = '[dodays-api] CREATE_AND_TAKE_DODAY',
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