import LayoutReducer from './reducer';

export * from './actions';
export * from './selectors';
export const getLayoutModule = () => ({
  id: 'layout',
  reducerMap: {
    layout: LayoutReducer,
  },
  sagas: [],
});
