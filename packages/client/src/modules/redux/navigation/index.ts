import reducer from './navigation-stack.reducer';
import navigationSagas from './navigation-stack.sagas';

export * from './navigation-stack.actions';
export * from './selectors';
export const getNavigationModule = () => ({
  id: 'navigation',
  reducerMap: {
    navigation: reducer,
  },
  sagas: [navigationSagas],
});
