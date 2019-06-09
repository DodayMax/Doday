import { AnyAction } from 'redux';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { DodayLike } from '@root/lib/models/entities/common';

export enum ActionConstants {
  SET_LOADING_STATE = '[store] SET_LOADING_STATE',
  FETCH_DODAYS_WITH_PARAMS = '[store] FETCH_DODAYS_WITH_PARAMS',
  SEARCH_DODAYS_WITH_PARAMS = '[store] SEARCH_DODAYS_WITH_PARAMS',
  SET_DODAYS = '[store] SET_DODAYS',
}

/**
 * Set store loading state
 *
 * @export
 * @returns {SetStoreLoadingStateAction}
 */
export function setStoreLoadingStateActionCreator(
  value: boolean
): SetStoreLoadingStateAction {
  return {
    type: ActionConstants.SET_LOADING_STATE,
    payload: value,
  };
}

/**
 * Search public dodays by (name, description)
 *
 * @export
 * @returns {SearchPublicDodaysForStoreAction}
 */
export function searchPublicDodaysForStoreActionCreator(
  params: DodaysQueryParams
): SearchPublicDodaysForStoreAction {
  return {
    type: ActionConstants.SEARCH_DODAYS_WITH_PARAMS,
    payload: params,
  };
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
  dodays: DodayLike[],
  concat?: boolean,
  totalCount?: number
): SetPublicDodaysForStoreAction {
  return {
    type: ActionConstants.SET_DODAYS,
    payload: {
      dodays,
      concat,
      totalCount,
    },
  };
}

export const actionCreators = {
  setStoreLoadingStateActionCreator,
  searchPublicDodaysForStoreActionCreator,
  fetchPublicDodaysForStoreActionCreator,
  setPublicDodaysForStoreActionCreator,
};

/**
 * Define return types of actions
 */

export interface SetStoreLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface SearchPublicDodaysForStoreAction extends AnyAction {
  type: ActionConstants.SEARCH_DODAYS_WITH_PARAMS;
  payload: DodaysQueryParams;
}

export interface FetchPublicDodaysForStoreAction extends AnyAction {
  type: ActionConstants.FETCH_DODAYS_WITH_PARAMS;
  payload: DodaysQueryParams;
}

export interface SetPublicDodaysForStoreAction extends AnyAction {
  type: ActionConstants.SET_DODAYS;
  payload: {
    dodays: DodayLike[];
    concat?: boolean;
    totalCount?: number;
  };
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetStoreLoadingStateAction
  | SearchPublicDodaysForStoreAction
  | FetchPublicDodaysForStoreAction
  | SetPublicDodaysForStoreAction;
