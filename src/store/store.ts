import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { RootState } from '@lib/models';

//reducers and sagas
import DodayAppReducer, { sagas as DodayAppSagas } from '@ducks/doday-app';
import BuilderReducer, { sagas as BuilderSagas } from '@ducks/builder';
import HeroSettingsReducer, { sagas as HeroSettingsSagas } from '@ducks/hero-settings';

const rootReducer = combineReducers<RootState>({
  dodayApp: DodayAppReducer,
  builder: BuilderReducer,
  heroSettings: HeroSettingsReducer,
});

function* rootSaga() {
  yield all([
    ...HeroSettingsSagas,
    ...DodayAppSagas,
    ...BuilderSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;