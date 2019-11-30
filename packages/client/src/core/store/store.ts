import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { getModuleSystemModule } from '@root/modules/redux/module-system';
import { getAuthenticationModule } from '@root/modules/redux/auth';

export const history = createBrowserHistory();

export const getRootModule = () => ({
  id: 'root',
  reducerMap: {
    router: connectRouter(history),
    // auth: ducks.auth.reducer,
  },
  middlewares: [routerMiddleware(history)],
  sagas: [rootSaga],
});

function* rootSaga() {
  // yield all([...ducks.auth.sagas]);
}

const store = createStore(
  {
    initialState: {},
    extensions: [getSagaExtension()],
  },
  getRootModule(),
  getAuthenticationModule(),
  getModuleSystemModule()
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
