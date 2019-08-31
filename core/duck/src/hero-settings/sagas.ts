import { call, takeEvery, select } from 'redux-saga/effects';
import { HeroSettingsActionConstants, ToggleDrawerAction } from './actions';
import { isDrawerCollapsed } from './selectors';

/**
 * Toggle drawer saga
 *
 * @param {ToggleDrawerAction} action
 */
export function* toggleDrawerActionSaga(action: ToggleDrawerAction) {
  const collapsed = yield select(isDrawerCollapsed);
  const value = action.payload != null ? action.payload : collapsed;
  // yield call(bake_cookie, 'isDrawerCollapsed', `${value}`);
  yield call(console.log, value);
}

export default [
  takeEvery(HeroSettingsActionConstants.TOGGLE_DRAWER, toggleDrawerActionSaga),
];
