import reducer from './reducer';

export * from './actions';
export const getModuleSystemModule = () => ({
  id: 'ms',
  reducerMap: {
    ms: reducer,
  },
  sagas: [],
});
