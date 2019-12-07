import {
  FetchActiveModulesForHeroAction,
  ModuleSystemActionConstants,
  fetchActiveModulesForHeroActionCreator,
  LoadModuleAction,
  loadModuleActionCreator,
  LoadModulesAction,
  loadModulesActionCreator,
  RegisterModuleBySysnameAction,
  registerModuleBySysnameActionCreator,
  registerModuleBySpotActionCreator,
  RegisterModuleBySpotAction,
  registerEntityActionCreator,
  RegisterEntityAction,
  registerSpotActionCreator,
  RegisterSpotAction,
  registerRouteActionCreator,
  RegisterRouteAction,
} from '../module-system.actions';
import {
  ModuleSysname,
  fakeDodayModule,
  fakeEntityConfig,
  fakeSpotConfig,
  fakeRouteConfig,
} from '@doday/lib';

describe('Module system action creators tests', () => {
  it('fetchActiveModulesForHeroActionCreator', () => {
    const expectedActionObject: FetchActiveModulesForHeroAction = {
      type: ModuleSystemActionConstants.FETCH_ACTIVE_MODULES_FOR_HERO,
    };
    expect(fetchActiveModulesForHeroActionCreator()).toEqual(
      expectedActionObject
    );
  });

  it('loadModuleActionCreator', () => {
    const payload = ModuleSysname.Auth;
    const expectedActionObject: LoadModuleAction = {
      type: ModuleSystemActionConstants.LOAD_MODULE,
      payload,
    };
    expect(loadModuleActionCreator(payload)).toEqual(expectedActionObject);
  });

  it('loadModulesActionCreator', () => {
    const payload = [ModuleSysname.Auth, ModuleSysname.Dialog];
    const expectedActionObject: LoadModulesAction = {
      type: ModuleSystemActionConstants.LOAD_MODULES,
      payload,
    };
    expect(loadModulesActionCreator(payload)).toEqual(expectedActionObject);
  });

  it('registerModuleBySysnameActionCreator', () => {
    const payload = fakeDodayModule;
    const expectedActionObject: RegisterModuleBySysnameAction = {
      type: ModuleSystemActionConstants.REGISTER_MODULE_BY_SYSNAME,
      payload,
    };
    expect(registerModuleBySysnameActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('registerModuleBySpotActionCreator', () => {
    const payload = fakeDodayModule;
    const expectedActionObject: RegisterModuleBySpotAction = {
      type: ModuleSystemActionConstants.REGISTER_MODULE_BY_SPOT,
      payload,
    };
    expect(registerModuleBySpotActionCreator(payload)).toEqual(
      expectedActionObject
    );
  });

  it('registerEntityActionCreator', () => {
    const payload = fakeEntityConfig;
    const expectedActionObject: RegisterEntityAction = {
      type: ModuleSystemActionConstants.REGISTER_ENTITY,
      payload,
    };
    expect(registerEntityActionCreator(payload)).toEqual(expectedActionObject);
  });

  it('registerSpotActionCreator', () => {
    const payload = fakeSpotConfig;
    const expectedActionObject: RegisterSpotAction = {
      type: ModuleSystemActionConstants.REGISTER_SPOT,
      payload,
    };
    expect(registerSpotActionCreator(payload)).toEqual(expectedActionObject);
  });

  it('registerRouteActionCreator', () => {
    const payload = fakeRouteConfig;
    const expectedActionObject: RegisterRouteAction = {
      type: ModuleSystemActionConstants.REGISTER_ROUTE,
      payload,
    };
    expect(registerRouteActionCreator(payload)).toEqual(expectedActionObject);
  });
});
