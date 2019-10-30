import reducer from './reducer';
import runMSSagas from './sagas';

export * from './actions';
export const getModuleSystemModule = () => ({
  id: 'ms',
  reducerMap: {
    ms: reducer,
  },
  sagas: [runMSSagas],
});
