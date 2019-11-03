import { NavigationState, BASE_ROUTES } from '@doday/lib';
import { Action, ActionTypes } from './navigation-stack.actions';

export const navigationInitialState: NavigationState = {
  base: {
    path: BASE_ROUTES.store,
    url: BASE_ROUTES.store,
  },
  stack: [],
  sidebar: {},
};

export default (
  state = navigationInitialState,
  action: Action
): NavigationState => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_BASE_ROUTE:
      return {
        ...state,
        base: payload,
      };
    case ActionTypes.STACK_ROUTE:
      return {
        ...state,
        stack: !state.stack.find(route => route.path === payload.path)
          ? state.stack.concat(payload)
          : state.stack,
      };
    case ActionTypes.UNSTACK_ROUTE:
      return {
        ...state,
        stack: [...state.stack.slice(0, state.stack.length - 1)],
      };
    case ActionTypes.CHANGE_SIDEBAR_ROUTE:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          route: action.payload,
        },
      };
    case ActionTypes.CLEAR_STACK:
      return {
        ...state,
        stack: [],
      };
    default:
      return state;
  }
};
