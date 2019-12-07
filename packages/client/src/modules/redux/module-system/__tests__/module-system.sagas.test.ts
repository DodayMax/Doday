import { call, all } from 'redux-saga/effects';
import { loadModuleSaga, loadModulesSaga } from '../module-system.sagas';
import {
  LoadModuleAction,
  ModuleSystemActionConstants,
  LoadModulesAction,
} from '../module-system.actions';
import { ModuleSysname } from '@doday/lib';
import { loadModule } from '../../../loader';

describe('Module system sagas tests', () => {
  it('loadModuleSaga', () => {
    const action: LoadModuleAction = {
      type: ModuleSystemActionConstants.LOAD_MODULE,
      payload: ModuleSysname.SignButtons,
    };
    const gen = loadModuleSaga(action);
    expect(gen.next().value).toEqual(call(loadModule, action.payload));
    expect(gen.next().done).toBe(true);
  });

  it('loadModulesSaga', () => {
    const action: LoadModulesAction = {
      type: ModuleSystemActionConstants.LOAD_MODULES,
      payload: [ModuleSysname.SignButtons, ModuleSysname.Dialog],
    };
    const tasks = action.payload.map(item => call(loadModule, item));
    const gen = loadModulesSaga(action);
    expect(gen.next().value).toEqual(all(tasks));
    expect(gen.next().done).toBe(true);
  });
});
