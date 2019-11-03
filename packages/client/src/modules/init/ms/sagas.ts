import { call, takeLatest, all, put } from 'redux-saga/effects';
import {
  LoadModuleAction,
  ModuleSystemActionConstants,
  LoadModulesAction,
} from './actions';
import { loadModule } from '@root/modules/loader';
import { pushRouteActionCreator } from '@root/modules/core/navigation';
import { DodayRoutes } from '@doday/lib';

/**
 * Load new single module
 *
 * @param {LoadModuleAction} action
 */
export function* loadModuleSaga(action: LoadModuleAction) {
  yield call(loadModule, action.payload.sysname, action.payload.type);
}

/**
 * Load modules
 *
 * @param {LoadModulesAction} action
 */
export function* loadModulesSaga(action: LoadModulesAction) {
  const tasks = action.payload.map(item =>
    call(loadModule, item.sysname, item.type)
  );
  yield all(tasks);
  /**
   * Push initial route to stack
   */
  const route = yield call(DodayRoutes.test, window.location.pathname);
  if (route) {
    yield put(pushRouteActionCreator(route.create().build()));
  }
}

export default function* runMSSagas() {
  yield all([
    takeLatest(ModuleSystemActionConstants.LOAD_MODULE, loadModuleSaga),
    takeLatest(ModuleSystemActionConstants.LOAD_MODULES, loadModulesSaga),
  ]);
}
