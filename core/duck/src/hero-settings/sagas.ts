import { call, takeEvery, select } from 'redux-saga/effects';
import { ActionConstants, ToggleDrawerAction } from './actions';
import { bake_cookie } from 'sfcookies';
import { isDrawerCollapsed } from './selectors';

/**
 * Toggle drawer saga
 *
 * @param {ToggleDrawerAction} action
 */
export function* toggleDrawerActionSaga(action: ToggleDrawerAction) {
  const collapsed = yield select(isDrawerCollapsed);
  const value = action.payload != null ? action.payload : collapsed;
  yield call(bake_cookie, 'isDrawerCollapsed', `${value}`);
}

export default [
  takeEvery(ActionConstants.TOGGLE_DRAWER, toggleDrawerActionSaga),
];
