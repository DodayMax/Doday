import { call, takeEvery } from 'redux-saga/effects';
import { DodayAppActionConstants, ChangeDodayAppRouteAction } from './actions';

/**
 * Toggle drawer saga
 *
 * @param {ChangeDodayAppRouteAction} action
 */
export function* changeDodayAppRouteActionSaga(
  action: ChangeDodayAppRouteAction
) {
  yield call(console.log, 'route', action.payload);
  // yield call(bake_cookie, 'route', action.payload);
}

export default [
  takeEvery(
    DodayAppActionConstants.CHANGE_ROUTE,
    changeDodayAppRouteActionSaga
  ),
];
