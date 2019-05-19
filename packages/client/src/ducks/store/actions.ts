import { AnyAction } from 'redux';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { DodayLike } from '@root/tools/types';

export enum ActionConstants {
  FETCH_DODAYS_WITH_PARAMS = '[store] FETCH_DODAYS_WITH_PARAMS',
  SET_DODAYS = '[store] SET_DODAYS',
}

/**
 * Fetch dodays
 *
 * @export
 * @returns {FetchPublicDodaysForStoreAction}
 */
export function fetchPublicDodaysForStoreActionCreator(
  params: DodaysQueryParams
): FetchPublicDodaysForStoreAction {
  return {
    type: ActionConstants.FETCH_DODAYS_WITH_PARAMS,
    payload: params,
  };
}

/**
 * Set public dodays
 *
 * @export
 * @returns {SetPublicDodaysForStoreAction}
 */
export function setPublicDodaysForStoreActionCreator(
  dodays: DodayLike[]
): SetPublicDodaysForStoreAction {
  return {
    type: ActionConstants.SET_DODAYS,
    payload: dodays,
  };
}

/**
 * Define return types of actions
 */

export interface FetchPublicDodaysForStoreAction extends AnyAction {
  type: ActionConstants.FETCH_DODAYS_WITH_PARAMS;
  payload: DodaysQueryParams;
}

export interface SetPublicDodaysForStoreAction extends AnyAction {
  type: ActionConstants.SET_DODAYS;
  payload: DodayLike[];
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | FetchPublicDodaysForStoreAction
  | SetPublicDodaysForStoreAction;
