import reducer from './oko.reducer';
import OKOSagas from './oko.sagas';

export * from './oko.actions';
export * from './oko.selectors';

export const getOKOModule = () => ({
  id: 'oko',
  reducerMap: {
    OKO: reducer,
  },
  sagas: [OKOSagas],
});
