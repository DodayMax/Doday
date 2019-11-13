import { AnyAction } from 'redux';
import { Node, Status } from '@doday/lib';

/*
 * Define action name constants here
 */
export enum ActionTypes {
  SET_STORE_GRID_STATUS = '[store-grid] SET_STORE_GRID_STATUS',
  FETCH_DODAYS = '[store-grid] FETCH_DODAYS',
  SET_DODAYS = '[store-grid] SET_DODAYS',
  SET_COUNT = '[store-grid] SET_COUNT',
}

/*
 * Define return types of actions
 */

export interface SetStoreGridStatusAction extends AnyAction {
  payload: Status;
  type: ActionTypes.SET_STORE_GRID_STATUS;
}

export interface FetchDodaysAction extends AnyAction {
  type: ActionTypes.FETCH_DODAYS;
}

export interface SetDodaysAction extends AnyAction {
  type: ActionTypes.SET_DODAYS;
  payload: Node[];
}

export interface SetDodaysCountAction extends AnyAction {
  type: ActionTypes.SET_COUNT;
  payload: number;
}

/*
 * Define actions creators
 */

export const setStoreGridStatusActionCreator = (
  payload: Status
): SetStoreGridStatusAction => {
  return {
    payload,
    type: ActionTypes.SET_STORE_GRID_STATUS,
  };
};

export const fetchDodaysActionCreator = (): FetchDodaysAction => {
  return {
    type: ActionTypes.FETCH_DODAYS,
  };
};

export const setDodaysActionCreator = (payload: Node[]): SetDodaysAction => {
  return {
    payload,
    type: ActionTypes.SET_DODAYS,
  };
};

export const setDodaysCountActionCreator = (
  payload: number
): SetDodaysCountAction => {
  return {
    payload,
    type: ActionTypes.SET_COUNT,
  };
};

export type Action =
  | SetStoreGridStatusAction
  | FetchDodaysAction
  | SetDodaysAction
  | SetDodaysCountAction;
