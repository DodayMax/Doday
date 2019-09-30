import { takeLatest, select, put, call } from 'redux-saga/effects';
import * as navigationActions from './navigation-stack.actions';
import { parseRoute, BASE_ROUTES, STATIC_ROUTES } from '@doday/lib';
import { push } from 'connected-react-router';
import { navStackSelector } from './selectors';

export function* pushRouteSaga(action: navigationActions.PushRouteAction) {
  const parsed = yield call(parseRoute, action.payload.route);
  if (Object.values(STATIC_ROUTES).includes(parsed.base)) return;
  if (Object.values(BASE_ROUTES).includes(parsed.base)) {
    yield put(navigationActions.setbaseActionCreator(action.payload.route));
    yield put(navigationActions.clearStackActionCreator());
  } else {
    yield put(navigationActions.stackRouteActionCreator(action.payload.route));
  }
  yield put(push(action.payload.route, action.payload.state));
}

export function* popRouteSaga(action: navigationActions.PopFromStackAction) {
  const navStack = yield select(navStackSelector);
  const popped = [...navStack.stack.slice(0, navStack.stack.length - 1)];
  if (popped.length) {
    yield put(push(popped[popped.length - 1]));
  } else {
    yield put(push(navStack.base));
  }
  yield put(navigationActions.unstackRouteActionCreator());
}

export default [
  takeLatest(navigationActions.ActionTypes.PUSH_ROUTE, pushRouteSaga),
  takeLatest(navigationActions.ActionTypes.POP_FROM_STACK, popRouteSaga),
];
