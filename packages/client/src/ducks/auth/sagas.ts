import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionConstants, FetchHeroAction, setHero } from './actions';
import { api } from '@root/services';

/**
 * Fetch Hero
 *
 * @param {FetchHeroAction} action
 */
function* fetchHeroSaga(action: FetchHeroAction) {
  const hero = yield call(api.heroes.queries.fetchCurrentHero);
  yield put(setHero(hero));
}

export default [takeLatest(ActionConstants.FETCH_HERO, fetchHeroSaga)];
