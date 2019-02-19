import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { RootState } from '@lib/models';

//reducers and sagas
import HeroSettingsReducer, { sagas as HeroSettingsSagas } from '@ducks/hero-settings';

const rootReducer = combineReducers<RootState>({
  heroSettings: HeroSettingsReducer,
});

function* rootSaga() {
  yield all([
    ...HeroSettingsSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;