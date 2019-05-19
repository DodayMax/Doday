import { AnyAction } from 'redux';
import { Token } from 'react-stripe-checkout';

export enum ActionConstants {
  HANDLE_TOKEN = '[coins] HANDLE_TOKEN',
}

/**
 * Fetch Hero
 *
 * @export
 * @returns {HandleTokenAction}
 */
export function handleTokenActionCreator(token: Token): HandleTokenAction {
  return {
    type: ActionConstants.HANDLE_TOKEN,
    payload: token,
  };
}

export const actionCreators = {
  handleTokenActionCreator,
};

/**
 * Define return types of actions
 */

export interface HandleTokenAction extends AnyAction {
  type: ActionConstants.HANDLE_TOKEN;
  payload: Token;
}

/**
 * Export all action types for reducers
 */

export type ActionTypes = HandleTokenAction;
