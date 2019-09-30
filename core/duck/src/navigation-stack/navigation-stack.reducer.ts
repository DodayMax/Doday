import { NavStackState } from '@doday/lib';
import { Action, ActionTypes } from './navigation-stack.actions';

export const navStackInitialState: NavStackState = {
  base: '/store',
  stack: [],
};

export default (
  state = navStackInitialState,
  action: Action
): NavStackState => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_STATIC_ROUTE:
      return {
        ...state,
        base: payload,
      };
    case ActionTypes.STACK_ROUTE:
      return {
        ...state,
        stack: !state.stack.includes(payload)
          ? state.stack.concat(payload)
          : state.stack,
      };
    case ActionTypes.UNSTACK_ROUTE:
      return {
        ...state,
        stack: [...state.stack.slice(0, state.stack.length - 1)],
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
