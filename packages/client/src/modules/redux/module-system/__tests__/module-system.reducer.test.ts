import reducer, { moduleSystemInitialState } from '../module-system.reducer';
import {
  registerModuleBySysnameActionCreator,
  registerModuleBySpotActionCreator,
  registerSpotActionCreator,
  registerRouteActionCreator,
  registerEntityActionCreator,
} from '../module-system.actions';
import {
  fakeDodayModule,
  fakeSpotConfig,
  fakeRouteConfig,
  fakeEntityConfig,
} from '@doday/lib';

describe('Module system reducer tests', () => {
  it('register module by sysname reducer', () => {
    const oldState = moduleSystemInitialState;
    const newState = reducer(
      {
        ...oldState,
      },
      registerModuleBySysnameActionCreator(fakeDodayModule)
    );
    expect(newState.modules[fakeDodayModule.config.sysname]).toEqual(
      fakeDodayModule
    );
  });

  it('register module by spot reducer', () => {
    const oldState = moduleSystemInitialState;
    const newState = reducer(
      {
        ...oldState,
      },
      registerModuleBySpotActionCreator(fakeDodayModule)
    );
    expect(newState.spots[fakeDodayModule.config.spot].modules.length).toBe(1);
    expect(newState.spots[fakeDodayModule.config.spot].modules[0]).toEqual(
      fakeDodayModule.config.sysname
    );
  });

  it('register module by spot with existed reducer', () => {
    const oldState = {
      ...moduleSystemInitialState,
      spots: {
        [fakeDodayModule.config.spot]: {
          spot: fakeSpotConfig,
          modules: [fakeDodayModule.config.sysname],
        },
      },
    };
    const newState = reducer(
      {
        ...oldState,
      },
      registerModuleBySpotActionCreator(fakeDodayModule)
    );
    expect(newState.spots[fakeDodayModule.config.spot].modules.length).toBe(1);
    expect(newState.spots[fakeDodayModule.config.spot].modules[0]).toEqual(
      fakeDodayModule.config.sysname
    );
  });

  it('register spot reducer', () => {
    const oldState = moduleSystemInitialState;
    const newState = reducer(
      {
        ...oldState,
      },
      registerSpotActionCreator(fakeSpotConfig)
    );
    expect(newState.spots[fakeSpotConfig.sysname].spot).toEqual(fakeSpotConfig);
  });

  it('register spot reducer', () => {
    const oldState = moduleSystemInitialState;
    const newState = reducer(
      {
        ...oldState,
      },
      registerSpotActionCreator(fakeSpotConfig)
    );
    expect(newState.spots[fakeSpotConfig.sysname].spot).toEqual(fakeSpotConfig);
  });

  it('register route reducer', () => {
    const oldState = moduleSystemInitialState;
    const newState = reducer(
      {
        ...oldState,
      },
      registerRouteActionCreator(fakeRouteConfig)
    );
    expect(newState.routes[fakeRouteConfig.sysname]).toEqual(fakeRouteConfig);
  });

  it('register entity reducer', () => {
    const oldState = moduleSystemInitialState;
    const newState = reducer(
      {
        ...oldState,
      },
      registerEntityActionCreator(fakeEntityConfig)
    );
    expect(newState.entities.length).toBe(1);
    expect(newState.entities[0]).toEqual(fakeEntityConfig);
  });
});
