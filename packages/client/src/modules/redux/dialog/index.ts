import reducer from './reducer';

export * from './actions';
export * from './selectors';
export const getDialogModule = () => ({
  id: 'dialog',
  reducerMap: {
    dialog: reducer,
  },
  sagas: [],
});
