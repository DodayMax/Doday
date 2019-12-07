import reducer from './store.reducer';
import storeSagas from './store.sagas';

export * from './store.actions';
export * from './store.selectors';
export const getStoreModule = () => ({
  id: 'store',
  reducerMap: {
    store: reducer,
  },
  sagas: [storeSagas],
});
