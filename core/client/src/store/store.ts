import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { all } from 'redux-saga/effects';
import ducks from '@doday/duck';

export const getRootModule = () => ({
  id: 'root',
  reducerMap: {
    auth: ducks.auth.reducer,
    sidebar: ducks.sidebar.reducer,
    details: ducks.details.reducer,
    heroSettings: ducks.settings.reducer,
    store: ducks.store.reducer,
    toast: ducks.toast.reducer,
    dialog: ducks.dialog.reducer,
  },
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
  ]);
}

const store = createStore(
  {
    initialState: {},
    extensions: [getSagaExtension()],
  },
  getRootModule()
);

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
