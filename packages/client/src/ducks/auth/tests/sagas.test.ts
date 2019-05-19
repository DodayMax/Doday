import { call, put } from 'redux-saga/effects';
import { fetchHeroActionSaga } from '../sagas';
import {
  FetchHeroAction,
  ActionConstants,
  setHeroActionCreator,
  setActiveToolBeaconsActionCreator,
} from '../actions';
import { api } from '@root/services';
import { hero } from '@root/lib/common-interfaces/fake-data';
import { activeToolsForHero } from '@root/lib/utils';

describe("Test Auth's sagas", () => {
  it('fetchHeroActionSaga', () => {
    const action: FetchHeroAction = {
      type: ActionConstants.FETCH_HERO,
    };
    const gen = fetchHeroActionSaga(action);
    expect(gen.next().value).toEqual(call(api.heroes.queries.fetchCurrentHero));
    expect(gen.next(hero).value).toEqual(put(setHeroActionCreator(hero)));
    expect(gen.next(hero).value).toEqual(call(activeToolsForHero, hero));
    const activeTools = activeToolsForHero(hero);
    expect(gen.next(activeTools).value).toEqual(
      put(setActiveToolBeaconsActionCreator(activeTools))
    );
  });
});
