import { call, takeEvery } from 'redux-saga/effects';
import { SidebarActionConstants, ChangeSidebarRouteAction } from './actions';

/**
 * Toggle drawer saga
 *
 * @param {ChangeSidebarRouteAction} action
 */
export function* changeSidebarRouteActionSaga(
  action: ChangeSidebarRouteAction
) {
  yield call(console.log, 'route', action.payload);
  // yield call(bake_cookie, 'route', action.payload);
}

export default [
  takeEvery(SidebarActionConstants.CHANGE_ROUTE, changeSidebarRouteActionSaga),
];
