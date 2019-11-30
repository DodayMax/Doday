import { call, takeEvery, all } from 'redux-saga/effects';
import {
  LoadModuleAction,
  LoadModulesAction,
  ModuleSystemActionConstants,
} from './module-system.actions';
import { loadModule } from '../../loader';

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
}

export default function* runModuleSystemSagas() {
  yield all([
    takeEvery(ModuleSystemActionConstants.LOAD_MODULE, loadModuleSaga),
    takeEvery(ModuleSystemActionConstants.LOAD_MODULES, loadModulesSaga),
  ]);
}
