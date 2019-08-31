import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { read_cookie } from 'sfcookies';
import ducks from '@doday/duck';
import {
  RootState,
  BuilderState,
  DodayAppState,
  ToolsBuilderState,
} from '@doday/lib';

const spreadToolsBuilderReducers = () => {
  const toolReducers = {};
  // toolBeacons.map(
  //   tool =>
  //     (toolReducers[tool.config.sysname] = tool.duck.reducers.builderReducer)
  // );
  return toolReducers;
};

const spreadToolsMainReducers = () => {
  const toolReducers = {};
  // toolBeacons.map(
  //   tool => (toolReducers[tool.config.sysname] = tool.duck.reducers.mainReducer)
  // );
  return toolReducers;
};

const spreadToolsSagas = () => {
  const toolSagas = [];
  // toolBeacons.map(tool => {
  //   toolSagas = toolSagas.concat(tool.duck.sagas);
  // });
  return toolSagas;
};

const rootReducer = combineReducers<RootState>({
  auth: ducks.auth.reducer,
  dodayApp: combineReducers<DodayAppState>({
    status: ducks.dodayApp.reducer,
  }),
  dodayDetails: ducks.details.reducer,
  builder: combineReducers<BuilderState>({
    status: ducks.builder.reducer,
  }),
  heroSettings: ducks.settings.reducer,
  store: ducks.store.reducer,
  // tools: toolBeacons.length
  //   ? combineReducers<ToolsState>({
  //       ...spreadToolsMainReducers(),
  //     })
  //   : undefined,
  toast: ducks.toast.reducer,
  dialog: ducks.dialog.reducer,
});

function* rootSaga() {
  yield all([
    ...ducks.auth.sagas,
    ...ducks.details.sagas,
    ...ducks.settings.sagas,
    ...ducks.dodayApp.sagas,
    ...ducks.api.sagas,
    ...ducks.store.sagas,
    ...spreadToolsSagas(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const route = read_cookie('route');
store.dispatch(ducks.dodayApp.actions.changeDodayAppRouteActionCreator(route));

/**
 * set stored values
 * TODO: Refactor this to store whole hero-settings in localstorage
 * */
const isDrawerCollapsed = read_cookie('isDrawerCollapsed');
store.dispatch(
  ducks.settings.actions.toggleDrawerActionCreator(isDrawerCollapsed == 'true')
);

sagaMiddleware.run(rootSaga);

export default store;
