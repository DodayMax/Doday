import { RootState } from '../models';
import { RouterState } from 'connected-react-router';

export const fakeRouterState: RouterState = {
  location: {
    pathname: 'path',
    search: '?search',
    state: {},
    hash: '',
  },
  action: 'PUSH',
};

export const fakeRootState: RootState = {
  router: fakeRouterState,
};
