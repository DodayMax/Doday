import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import ducks from '@ducks';
import { RootState, BuilderState, DodayAppState } from '@lib/models';
import { toolBeacons, ToolsState } from '@root/tools';

const spreadDodayAppToolsReducers = () => {
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
    status: ducks.dodayapp.reducers.dodayAppStatusReducer,
    schedule: ducks.dodayapp.reducers.dodayAppReducer,
  }),
  dodayDetails: ducks.dodayDetails.default,
  builder: combineReducers<BuilderState>({
    status: ducks.builder.default,
    activity: ducks.activities.reducers.builderReducer,
  }),
  heroSettings: ducks.herosettings.default,
  tools: toolBeacons.length
    ? combineReducers<ToolsState>({
        ...spreadDodayAppToolsReducers(),
      })
    : undefined,
});

function* rootSaga() {
  yield all([
    ...ducks.auth.authSagas,
    ...ducks.builder.builderSagas,
    ...ducks.dodayapp.dodayappSagas,
    ...ducks.dodayDetails.dodayDetailsSagas,
    ...ducks.herosettings.herosettingsSagas,
    ...ducks.payments.coinsSagas,
    ...ducks.api.dodays.apisagas,
    ...spreadToolsSagas(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
