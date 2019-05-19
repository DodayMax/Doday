import { call, takeEvery } from 'redux-saga/effects';
import { ActionConstants, ToggleDrawerAction } from './actions';

/**
 * Toggle drawer saga
 *
 * @param {ToggleDrawerAction} action
 */
function* toggleDrawerActionCreator(action: ToggleDrawerAction) {
  // yield call(console.log, 'toggle drawer saga')
}

export default [
  takeEvery(ActionConstants.TOGGLE_DRAWER, toggleDrawerActionCreator),
];
