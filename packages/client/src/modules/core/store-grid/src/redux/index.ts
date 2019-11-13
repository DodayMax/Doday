import reducer from './store-grid.reducer';
import storeGridSagas from './store-grid.sagas';

export * from './store-grid.actions';
export * from './store-grid.selectors';
export const getStoreGridModule = () => ({
  id: 'store-grid',
  reducerMap: {
    storeGrid: reducer,
  },
  sagas: [storeGridSagas],
});
