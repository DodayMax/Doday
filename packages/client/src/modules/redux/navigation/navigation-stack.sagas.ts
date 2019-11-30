import { takeLatest, select, put, call, all } from 'redux-saga/effects';
import * as navigationActions from './navigation-stack.actions';
import { RouteType } from '@doday/lib';
import { push } from 'connected-react-router';
import { navigationStateSelector } from './selectors';
import { RouteSystem } from '@root/core/systems';

export function* pushRouteSaga(action: navigationActions.PushRouteAction) {
  const route = yield call(RouteSystem.api().test, action.payload.url);
  if (
    (route && route.type === RouteType.Base) ||
    (route && route.type === RouteType.Sidebar)
  ) {
    yield put(navigationActions.setBaseRouteActionCreator(action.payload));
    yield put(navigationActions.clearStackActionCreator());
  } else if (route && route.type === RouteType.Stacked) {
    yield put(navigationActions.stackRouteActionCreator(action.payload));
  }
  yield put(push(action.payload.url, action.payload.payload));
}

export function* popRouteSaga(action: navigationActions.PopFromStackAction) {
  const navigation = yield select(navigationStateSelector);
  const popped = [...navigation.stack.slice(0, navigation.stack.length - 1)];
  if (popped.length) {
    yield put(push(popped[popped.length - 1].url));
  } else {
    yield put(push(navigation.base.url));
  }
  yield put(navigationActions.unstackRouteActionCreator());
}

export default function*() {
  yield all([
    takeLatest(navigationActions.ActionTypes.PUSH_ROUTE, pushRouteSaga),
    takeLatest(navigationActions.ActionTypes.POP_FROM_STACK, popRouteSaga),
  ]);
}
