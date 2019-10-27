import reducer from './reducer';
import authSagas from './sagas';

export * from './actions';
export const getAuthenticationModule = () => ({
  id: 'auth',
  reducerMap: {
    auth: reducer,
  },
  sagas: [authSagas],
});
