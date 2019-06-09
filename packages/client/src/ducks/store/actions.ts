import { AnyAction } from 'redux';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { DodayLike } from '@root/lib/models/entities/common';

export enum ActionConstants {
  SET_LOADING_STATE = '[store] SET_LOADING_STATE',
  FETCH_DODAYS_WITH_PARAMS = '[store] FETCH_DODAYS_WITH_PARAMS',
  SET_SEARCH_TERM = '[store] SET_SEARCH_TERM',
  SET_SEARCH_FLAG = '[store] SET_SEARCH_FLAG',
  SEARCH_DODAYS_WITH_PARAMS = '[store] SEARCH_DODAYS_WITH_PARAMS',
  SET_DODAYS = '[store] SET_DODAYS',
  OPTIMISTIC_REMOVE_PUBLIC_DODAY = '[store] OPTIMISTIC_REMOVE_PUBLIC_DODAY',
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
 * Set search term
 *
 * @export
 * @returns {SetSearchTermAction}
 */
export function setSearchTermActionCreator(term: string): SetSearchTermAction {
  return {
    type: ActionConstants.SET_SEARCH_TERM,
    payload: term,
  };
}

/**
 * Set search flag to choose between fetch and search actions
 * when trigger loadMore
 *
 * @export
 * @returns {SetSearchFlagAction}
 */
export function setSearchFlagActionCreator(
  value: boolean
): SetSearchFlagAction {
  return {
    type: ActionConstants.SET_SEARCH_FLAG,
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

/**
 * Optimistic remove from public dodays
 *
 * @export
 * @returns {OptimisticRemovePublicDodayAction}
 */
export function optimisticRemovePublicDodayActionCreator(
  did: string
): OptimisticRemovePublicDodayAction {
  return {
    type: ActionConstants.OPTIMISTIC_REMOVE_PUBLIC_DODAY,
    payload: did,
  };
}

export const actionCreators = {
  setStoreLoadingStateActionCreator,
  setSearchTermActionCreator,
  setSearchFlagActionCreator,
  searchPublicDodaysForStoreActionCreator,
  fetchPublicDodaysForStoreActionCreator,
  setPublicDodaysForStoreActionCreator,
  optimisticRemovePublicDodayActionCreator,
};

/**
 * Define return types of actions
 */

export interface SetStoreLoadingStateAction extends AnyAction {
  type: ActionConstants.SET_LOADING_STATE;
  payload: boolean;
}

export interface SetSearchTermAction extends AnyAction {
  type: ActionConstants.SET_SEARCH_TERM;
  payload: string;
}

export interface SetSearchFlagAction extends AnyAction {
  type: ActionConstants.SET_SEARCH_FLAG;
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

export interface OptimisticRemovePublicDodayAction extends AnyAction {
  type: ActionConstants.OPTIMISTIC_REMOVE_PUBLIC_DODAY;
  payload: string;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes =
  | SetStoreLoadingStateAction
  | SetSearchTermAction
  | SetSearchFlagAction
  | SearchPublicDodaysForStoreAction
  | FetchPublicDodaysForStoreAction
  | SetPublicDodaysForStoreAction
  | OptimisticRemovePublicDodayAction;
