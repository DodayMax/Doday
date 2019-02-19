import { call, takeEvery } from 'redux-saga/effects';
import { ActionConstants, ToggleDrawerAction } from './actions';

/**
 * Toggle drawer saga
 *
 * @export
 * @param {ToggleDrawerAction} action
 */
function* toggleDrawer(action: ToggleDrawerAction) {
  // Add a Toast on screen.
  yield call(console.log, 'toggle drawer saga')
}

export default [
  takeEvery(ActionConstants.TOGGLE_DRAWER, toggleDrawer),
];