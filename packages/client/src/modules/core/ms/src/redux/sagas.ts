import { call, takeLatest, all, put, select, delay } from 'redux-saga/effects';
import {
  LoadModuleAction,
  ModuleSystemActionConstants,
  LoadModulesAction,
  BuyModuleAction,
} from './actions';
import { loadModule } from '@root/modules/loader';
import {
  pushRouteActionCreator,
  routerLocationStateSelector,
  baseRouteSelector,
} from '@root/modules/core/navigation';
import { DodayRoutes } from '@doday/lib';
import { push } from 'connected-react-router';
import { buyModuleRequest } from '@doday/requests';
import { activeModulesSelector } from '@root/modules/core/auth';
import { moduleSystemStateSelector } from './selectors';

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
  yield delay(1500);
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
    DodayRoutes.test,
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

/**
 * Buy module logic
 *
 * @param {BuyModuleAction} action
 */
export function* buyModuleSaga(action: BuyModuleAction) {
  // Make request to buy new module
  const response = yield call(buyModuleRequest, action.payload);
  const ms = yield select(moduleSystemStateSelector);
  /**
   * Load module if it hasn't been previously loaded
   */
  if (response.data && !ms[response.data.type][response.data.sysname]) {
    yield call(loadModule, response.data.sysname, response.data.type);
  }
}

export default function* runMSSagas() {
  yield all([
    takeLatest(ModuleSystemActionConstants.LOAD_MODULE, loadModuleSaga),
    takeLatest(ModuleSystemActionConstants.LOAD_MODULES, loadModulesSaga),
    takeLatest(ModuleSystemActionConstants.BUY_MODULE, buyModuleSaga),
  ]);
}
