import { call, takeEvery, all, select, put } from 'redux-saga/effects';
import {
  LoadModuleAction,
  LoadModulesAction,
  ModuleSystemActionConstants,
  SetInitializedStatusAction,
} from './module-system.actions';
import { loadModule } from '../../loader';
import {
  routerLocationStateSelector,
  baseRouteSelector,
  pushRouteActionCreator,
} from '../navigation';
import { RouteSystem } from '@root/core/systems';
import { push } from 'connected-react-router';

/**
 * Load new single module
 *
 * @param {LoadModuleAction} action
 */
export function* loadModuleSaga(action: LoadModuleAction) {
  yield call(loadModule, action.payload);
}

/**
 * Load modules
 *
 * @param {LoadModulesAction} action
 */
export function* loadModulesSaga(action: LoadModulesAction) {
  const tasks = action.payload.map(item => call(loadModule, item));
  yield all(tasks);
  if (action.meta && action.meta.after) {
    yield put(action.meta.after);
  }
}

/**
 * Parse initial route when the app is initialized
 *
 * @param {SetInitializedStatusAction} action
 */
export function* parseInitialRouteSaga(action: SetInitializedStatusAction) {
  /**
   * Push initial route to stack
   */
  const location = yield select(routerLocationStateSelector);
  const baseRoute = yield select(baseRouteSelector);
  /**
   * Find suitable registered route for
   * current location
   */
  const suitableRouteModel = yield call(
    RouteSystem.api().test,
    location.pathname + location.search
  );
  /**
   * Parse current location to Route object
   */
  if (suitableRouteModel) {
    const route = yield call(
      suitableRouteModel.parse,
      location.pathname + location.search
    );
    if (route) {
      yield put(pushRouteActionCreator(route));
    }
  } else {
    // Push default base route to browser location
    yield put(push(baseRoute.url));
  }
}

export default function* runModuleSystemSagas() {
  yield all([
    takeEvery(ModuleSystemActionConstants.LOAD_MODULE, loadModuleSaga),
    takeEvery(ModuleSystemActionConstants.LOAD_MODULES, loadModulesSaga),
    takeEvery(
      ModuleSystemActionConstants.SET_IS_INITIALIZED_STATUS,
      parseInitialRouteSaga
    ),
  ]);
}
