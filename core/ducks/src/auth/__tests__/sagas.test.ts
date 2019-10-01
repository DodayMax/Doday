import { call, put } from 'redux-saga/effects';
import { fetchHeroActionSaga } from '../sagas';
import actions, { FetchHeroAction, AuthActionConstants } from '../actions';
import api from '@doday/api';
import { hero } from '@doday/lib';

describe("Test Auth's sagas", () => {
  it('fetchHeroActionSaga', () => {
    const action: FetchHeroAction = {
      type: AuthActionConstants.FETCH_HERO,
    };
    const gen = fetchHeroActionSaga(action);
    expect(gen.next().value).toEqual(call(api.heroes.queries.fetchCurrentHero));
    expect(gen.next(hero).value).toEqual(
      put(actions.setHeroActionCreator(hero))
    );
    // expect(gen.next(hero).value).toEqual(call(activeToolsForHero, hero));
    // const activeTools = activeToolsForHero(hero);
    // expect(gen.next(activeTools).value).toEqual(
    //   put(setActiveToolBeaconsActionCreator(activeTools))
    // );
    expect(gen.next().done).toBe(true);
  });
});
