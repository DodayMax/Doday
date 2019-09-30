import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { all } from 'redux-saga/effects';
import ducks from '@doday/duck';

export const history = createBrowserHistory();

export const getRootModule = () => ({
  id: 'root',
  reducerMap: {
    router: connectRouter(history),
    auth: ducks.auth.reducer,
    sidebar: ducks.sidebar.reducer,
    details: ducks.details.reducer,
    heroSettings: ducks.settings.reducer,
    store: ducks.store.reducer,
    toast: ducks.toast.reducer,
    dialog: ducks.dialog.reducer,
    navStack: ducks.navStack.reducer,
  },
  middlewares: [routerMiddleware(history)],
  sagas: [rootSaga],
});

function* rootSaga() {
  yield all([
    ...ducks.auth.sagas,
    ...ducks.settings.sagas,
    ...ducks.details.sagas,
    ...ducks.sidebar.sagas,
    ...ducks.api.sagas,
    ...ducks.store.sagas,
    ...ducks.navStack.sagas,
  ]);
}

const store = createStore(
  {
    initialState: {},
    extensions: [getSagaExtension()],
  },
  getRootModule()
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
