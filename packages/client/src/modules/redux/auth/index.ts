import reducer from './auth.reducer';
import authSagas from './auth.sagas';

export * from './auth.actions';
export * from './auth.selectors';
export const getAuthenticationModule = () => ({
  id: 'auth',
  reducerMap: {
    auth: reducer,
  },
  sagas: [authSagas],
});
