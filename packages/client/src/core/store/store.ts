import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { getAuthenticationModule } from '@redux/auth';
import { getDialogModule } from '@root/modules/redux/dialog';
import { getToastModule } from '@root/modules/redux/toast';

export const history = createBrowserHistory();

export const getRootModule = () => ({
  id: 'root',
  reducerMap: {
    router: connectRouter(history),
  },
  middlewares: [routerMiddleware(history)],
  sagas: [],
});

const store = createStore(
  {
    initialState: {},
    extensions: [getSagaExtension()],
  },
  getRootModule(),
  getAuthenticationModule(),
  getDialogModule(),
  getToastModule()
);

// expose store when run in Cypress
if ((window as any).Cypress) {
  (window as any).store = store;
}

// const route = read_cookie('route');
// store.dispatch(ducks.sidebar.actions.changeSidebarRouteActionCreator(route));

// /**
//  * set stored values
//  * TODO: Refactor this to store whole hero-settings in localstorage
//  * */
// const isDrawerCollapsed = read_cookie('isDrawerCollapsed');
// store.dispatch(
//   ducks.settings.actions.toggleDrawerActionCreator(isDrawerCollapsed == 'true')
// );

export default store;
