import reducer from './reducer';
import authSagas from './sagas';

export * from './actions';
export * from './selectors';
export const getAuthenticationModule = () => ({
  id: 'auth',
  reducerMap: {
    auth: reducer,
  },
  sagas: [authSagas],
});
