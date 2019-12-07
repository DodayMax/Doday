import reducer from './module-system.reducer';
import sagas from './module-system.sagas';

export * from './module-system.actions';
export * from './module-system.selectors';
export const getModuleSystemModule = () => ({
  id: 'modules',
  reducerMap: {
    modules: reducer,
  },
  sagas: [sagas],
});
