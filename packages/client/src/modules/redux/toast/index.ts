import reducer from './reducer';

export * from './actions';
export * from './selectors';
export const getToastModule = () => ({
  id: 'toast',
  reducerMap: {
    toast: reducer,
  },
  sagas: [],
});
