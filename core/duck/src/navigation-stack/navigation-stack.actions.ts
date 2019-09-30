import { AnyAction } from 'redux';

/*
 * Define action name constants here
 */
export enum ActionTypes {
  PUSH_ROUTE = 'navstack/PUSH_ROUTE',
  SET_STATIC_ROUTE = 'navstack/SET_STATIC_ROUTE',
  STACK_ROUTE = 'navstack/STACK_ROUTE',
  UNSTACK_ROUTE = 'navstack/UNSTACK_ROUTE',
  POP_FROM_STACK = 'navstack/POP_FROM_STACK',
  CLEAR_STACK = 'navstack/CLEAR_STACK',
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

export interface SetbaseAction extends AnyAction {
  payload: string;
  type: ActionTypes.SET_STATIC_ROUTE;
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

export const setbaseActionCreator = (route: string): SetbaseAction => {
  return {
    type: ActionTypes.SET_STATIC_ROUTE,
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

export const clearStackActionCreator = (): ClearStackAction => {
  return {
    type: ActionTypes.CLEAR_STACK,
  };
};

export default {
  popFromStackActionCreator,
  pushRouteActionCreator,
  setbaseActionCreator,
  stackRouteActionCreator,
  unstackRouteActionCreator,
  clearStackActionCreator,
};

export type Action =
  | PushRouteAction
  | SetbaseAction
  | StackRouteAction
  | UnStackRouteAction
  | PopFromStackAction
  | ClearStackAction;
