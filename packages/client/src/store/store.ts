import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { read_cookie } from 'sfcookies';
import ducks from '@ducks';
import { RootState, BuilderState, DodayAppState } from '@lib/models';
import { ToolsState, ToolsBuilderState } from '@root/tools/types';
import { toolBeacons } from '@root/tools';
import { changeDodayAppRouteActionCreator } from '@root/ducks/doday-app/actions';
import { toggleDrawerActionCreator } from '@root/ducks/hero-settings/actions';

const spreadToolsBuilderReducers = () => {
  const toolReducers = {};
  toolBeacons.map(
    tool =>
      (toolReducers[tool.config.sysname] = tool.duck.reducers.builderReducer)
  );
  return toolReducers;
};

const spreadToolsMainReducers = () => {
  const toolReducers = {};
  toolBeacons.map(
    tool => (toolReducers[tool.config.sysname] = tool.duck.reducers.mainReducer)
  );
  return toolReducers;
};

const spreadToolsSagas = () => {
  let toolSagas = [];
  toolBeacons.map(tool => {
    toolSagas = toolSagas.concat(tool.duck.sagas);
  });
  return toolSagas;
};

const rootReducer = combineReducers<RootState>({
  auth: ducks.auth.default,
  dodayApp: combineReducers<DodayAppState>({
    status: ducks.dodayapp.default,
  }),
  dodayDetails: ducks.dodayDetails.default,
  builder: combineReducers<BuilderState>({
    status: ducks.builder.default,
    tools: combineReducers<ToolsBuilderState>({
      ...spreadToolsBuilderReducers(),
    }),
  }),
  heroSettings: ducks.herosettings.default,
  store: ducks.store.default,
  tools: toolBeacons.length
    ? combineReducers<ToolsState>({
        ...spreadToolsMainReducers(),
      })
    : undefined,
  toast: ducks.toast.default,
  dialog: ducks.dialog.default,
});

function* rootSaga() {
  yield all([
    ...ducks.auth.authSagas,
    ...ducks.dodayDetails.dodayDetailsSagas,
    ...ducks.herosettings.herosettingsSagas,
    ...ducks.dodayapp.dodayAppSagas,
    ...ducks.payments.coinsSagas,
    ...ducks.api.dodays.apisagas,
    ...ducks.store.storeSagas,
    ...spreadToolsSagas(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const route = read_cookie('route');
store.dispatch(changeDodayAppRouteActionCreator(route));

/**
 * set stored values
 * TODO: Refactor this to store whole hero-settings in localstorage
 * */
const isDrawerCollapsed = read_cookie('isDrawerCollapsed');
store.dispatch(toggleDrawerActionCreator(isDrawerCollapsed == 'true'));

sagaMiddleware.run(rootSaga);

export default store;
