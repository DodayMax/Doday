import reducer from './module-system.reducer';
import ModuleSystemSagas from './module-system.sagas';

export * from './module-system.actions';
export * from './module-system.selectors';

export const getModuleSystemModule = () => ({
  id: 'module-system',
  reducerMap: {
    ModuleSystem: reducer,
  },
  sagas: [ModuleSystemSagas],
});
