import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  FetchHeroAction,
  setHero,
  setActiveToolBeaconsActionCreator,
} from './actions';
import { api } from '@root/services';
import { toolBeacons } from '@root/tools';
import { Hero } from '@root/lib/models/entities/hero';

/**
 * Fetch Hero
 *
 * @param {FetchHeroAction} action
 */
function* fetchHeroSaga(action: FetchHeroAction) {
  const hero: Hero = yield call(api.heroes.queries.fetchCurrentHero);
  yield put(setHero(hero));
  const activeTools = toolBeacons.filter(tool =>
    hero.tools.find(item => item === tool.config.sysname)
  );
  yield put(setActiveToolBeaconsActionCreator(activeTools));
}

export default [takeLatest(ActionConstants.FETCH_HERO, fetchHeroSaga)];
