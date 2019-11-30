import reducer from './module-system.reducer';
import sagas from './module-system.sagas';

export * from './module-system.actions';
export * from './module-system.selectors';
export const getModuleSystemModule = () => ({
  id: 'module-system',
  reducerMap: {
    modules: reducer,
  },
  sagas: [sagas],
});
