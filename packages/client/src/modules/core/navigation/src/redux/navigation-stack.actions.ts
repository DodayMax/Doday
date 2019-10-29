import { AnyAction } from 'redux';

/*
 * Define action name constants here
 */
export enum ActionTypes {
  PUSH_ROUTE = '[navigation] PUSH_ROUTE',
  SET_BASE_ROUTE = '[navigation] SET_BASE_ROUTE',
  STACK_ROUTE = '[navigation] STACK_ROUTE',
  UNSTACK_ROUTE = '[navigation] UNSTACK_ROUTE',
  POP_FROM_STACK = '[navigation] POP_FROM_STACK',
  CHANGE_SIDEBAR_ROUTE = '[navigation] CHANGE_SIDEBAR_ROUTE',
  CLEAR_STACK = '[navigation] CLEAR_STACK',
}

/*
 * Define return types of actions
 */

export interface PushRouteAction extends AnyAction {
  payload: {
    route: string;
    state?: any;
  };
  type: ActionTypes.PUSH_ROUTE;
}

export interface SetBaseRouteAction extends AnyAction {
  payload: string;
  type: ActionTypes.SET_BASE_ROUTE;
}

export interface StackRouteAction extends AnyAction {
  payload: string;
  type: ActionTypes.STACK_ROUTE;
}

export interface UnStackRouteAction extends AnyAction {
  type: ActionTypes.UNSTACK_ROUTE;
}

export interface PopFromStackAction extends AnyAction {
  type: ActionTypes.POP_FROM_STACK;
}

export interface ChangeSidebarRouteAction extends AnyAction {
  type: ActionTypes.CHANGE_SIDEBAR_ROUTE;
  payload: string;
}

export interface ClearStackAction extends AnyAction {
  type: ActionTypes.CLEAR_STACK;
}

/*
 * Define actions creators
 */

/** Actions to start saga */
export const popFromStackActionCreator = (): PopFromStackAction => {
  return {
    type: ActionTypes.POP_FROM_STACK,
  };
};

export const pushRouteActionCreator = (
  route: string,
  state?: any
): PushRouteAction => {
  return {
    type: ActionTypes.PUSH_ROUTE,
    payload: {
      route,
      state,
    },
  };
};

/** Actions to change state */

export const setBaseRouteActionCreator = (
  route: string
): SetBaseRouteAction => {
  return {
    type: ActionTypes.SET_BASE_ROUTE,
    payload: route,
  };
};

export const stackRouteActionCreator = (route: string): StackRouteAction => {
  return {
    type: ActionTypes.STACK_ROUTE,
    payload: route,
  };
};

export const unstackRouteActionCreator = (): UnStackRouteAction => {
  return {
    type: ActionTypes.UNSTACK_ROUTE,
  };
};

export const changeSidebarRouteActionCreator = (
  route: string
): ChangeSidebarRouteAction => {
  return {
    type: ActionTypes.CHANGE_SIDEBAR_ROUTE,
    payload: route,
  };
};

export const clearStackActionCreator = (): ClearStackAction => {
  return {
    type: ActionTypes.CLEAR_STACK,
  };
};

export default {
  popFromStackActionCreator,
  pushRouteActionCreator,
  setBaseRouteActionCreator,
  stackRouteActionCreator,
  unstackRouteActionCreator,
  changeSidebarRouteActionCreator,
  clearStackActionCreator,
};

export type Action =
  | PushRouteAction
  | SetBaseRouteAction
  | StackRouteAction
  | UnStackRouteAction
  | PopFromStackAction
  | ChangeSidebarRouteAction
  | ClearStackAction;
