import { call, put, takeLatest } from 'redux-saga/effects';
import actions, {
  FetchHeroAction,
  AuthActionConstants,
  LoadHeroToolsAction,
} from './actions';
import api from '@doday/api';
import { Hero, ToolBeacon } from '@doday/lib';
import authActions from './actions';

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

/**
 * Load Hero tools
 *
 * @param {FetchHeroAction} action
 */
export function* loadHeroToolsActionSaga(action: LoadHeroToolsAction) {
  // TODO: replace with selector when API and DB schema is ready
  const fakeTools = [
    {
      sysname: 'activities',
      title: 'Activities',
      price: 0,
      path: '@tools/activities',
    },
  ];
  const loadedTools: ToolBeacon[] = [];
  fakeTools.map(async heroTool => {
    const loadedTool = await import(heroTool.path);
    loadedTools.push(loadedTool);
  });
  yield put(authActions.setActiveToolBeaconsActionCreator(loadedTools));
}

export default [
  takeLatest(AuthActionConstants.FETCH_HERO, fetchHeroActionSaga),
  takeLatest(AuthActionConstants.LOAD_HERO_TOOLS, loadHeroToolsActionSaga),
];
