import { call, put, takeLatest } from 'redux-saga/effects';
import actions, { FetchHeroAction, AuthActionConstants } from './actions';
import api from '@doday/api';
import { Hero } from '@doday/lib';

/**
 * Fetch Hero
 *
 * @param {FetchHeroAction} action
 */
export function* fetchHeroActionSaga(action: FetchHeroAction) {
  const hero: Hero = yield call(api.heroes.queries.fetchCurrentHero);
  yield put(actions.setHeroActionCreator(hero));
  // const activeTools = yield call(activeToolsForHero, hero);
  // yield put(setActiveToolBeaconsActionCreator(activeTools));
}

export default [
  takeLatest(AuthActionConstants.FETCH_HERO, fetchHeroActionSaga),
];
