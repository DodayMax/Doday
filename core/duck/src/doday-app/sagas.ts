import { call, takeEvery } from 'redux-saga/effects';
import { ActionConstants, ChangeDodayAppRouteAction } from './actions';
import { bake_cookie } from 'sfcookies';

/**
 * Toggle drawer saga
 *
 * @param {ChangeDodayAppRouteAction} action
 */
export function* changeDodayAppRouteActionSaga(
  action: ChangeDodayAppRouteAction
) {
  yield call(bake_cookie, 'route', action.payload);
}

export default [
  takeEvery(ActionConstants.CHANGE_ROUTE, changeDodayAppRouteActionSaga),
];
