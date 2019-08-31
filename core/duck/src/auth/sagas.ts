import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  FetchHeroAction,
  setHeroActionCreator,
  setActiveToolBeaconsActionCreator,
} from './actions';
import { api } from '@root/services';
import { Hero } from '@root/lib/models/entities/hero';
import { activeToolsForHero } from '@root/lib/utils';

/**
 * Fetch Hero
 *
 * @param {FetchHeroAction} action
 */
export function* fetchHeroActionSaga(action: FetchHeroAction) {
  const hero: Hero = yield call(api.heroes.queries.fetchCurrentHero);
  yield put(setHeroActionCreator(hero));
  const activeTools = yield call(activeToolsForHero, hero);
  yield put(setActiveToolBeaconsActionCreator(activeTools));
}

export default [takeLatest(ActionConstants.FETCH_HERO, fetchHeroActionSaga)];
