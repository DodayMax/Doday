import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import ducks from '@ducks';
import { RootState, BuilderState } from '@lib/models';

const rootReducer = combineReducers<RootState>({
  auth: ducks.auth.default,
  dodayApp: ducks.dodayapp.default,
  dodayDetails: ducks.dodayDetails.default,
  builder: combineReducers<BuilderState>({
    status: ducks.builder.default,
    activity: ducks.activities.default,
  }),
  heroSettings: ducks.herosettings.default,
});

function* rootSaga() {
  yield all([
    ...ducks.auth.authSagas,
    ...ducks.builder.builderSagas,
    ...ducks.dodayapp.dodayappSagas,
    ...ducks.dodayDetails.dodayDetailsSagas,
    ...ducks.herosettings.herosettingsSagas,
    ...ducks.payments.coinsSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
