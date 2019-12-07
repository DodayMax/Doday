import { AnyAction } from 'redux';
import { Node, Status } from '@doday/lib';

/*
 * Define action name constants here
 */
export enum ActionTypes {
  SET_STORE_STATUS = '[store] SET_STORE_STATUS',
  FETCH_DODAYS = '[store] FETCH_DODAYS',
  SET_DODAYS = '[store] SET_DODAYS',
  SET_COUNT = '[store] SET_COUNT',
}

/*
 * Define return types of actions
 */

export interface SetStoreStatusAction extends AnyAction {
  payload: Status;
  type: ActionTypes.SET_STORE_STATUS;
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

export const setStoreStatusActionCreator = (
  payload: Status
): SetStoreStatusAction => {
  return {
    payload,
    type: ActionTypes.SET_STORE_STATUS,
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
  | SetStoreStatusAction
  | FetchDodaysAction
  | SetDodaysAction
  | SetDodaysCountAction;
