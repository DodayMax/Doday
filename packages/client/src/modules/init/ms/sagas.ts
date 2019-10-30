import { call, takeLatest, all } from 'redux-saga/effects';
import {
  LoadModuleAction,
  ModuleSystemActionConstants,
  LoadModulesAction,
} from './actions';
import { loadModule } from '@root/modules/loader';

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
  console.log(tasks);
  yield all(tasks);
}

export default function* runMSSagas() {
  yield all([
    takeLatest(ModuleSystemActionConstants.LOAD_MODULE, loadModuleSaga),
    takeLatest(ModuleSystemActionConstants.LOAD_MODULES, loadModulesSaga),
  ]);
}
