import { call, put, takeLatest } from 'redux-saga/effects';
import actions, {
  AuthActionConstants,
  SignInWithGoogleAction,
  LogoutAction,
  GetCurrentHeroAction,
} from './actions';
import api from '@doday/api';
import { Hero } from '@doday/lib';
import { signinAPIRequest } from '@doday/api/dist/src/auth/queries';

/**
 * Auth with Google saga
 *
 * @param {SignInWithGoogleAction} action
 */
export function* signInWithGoogleSaga(action: SignInWithGoogleAction) {
  yield put(actions.setAuthStatusActionCreator({ loading: true }));
  const response = yield call(api.auth.queries.signInWithGoogleFirebaseRequest);
  if (response.error) {
    // Handle error
  } else {
    // Send API request to doday server
    if (response.user) {
      response.user.getIdToken().then((token: string) => {
        signinAPIRequest(token);
      });
    }
  }
  yield put(actions.setAuthStatusActionCreator({ loading: false }));
}

/**
 * Logout saga
 *
 * @param {SignInWithGoogleAction} action
 */
export function* logoutSaga(action: LogoutAction) {
  yield put(actions.setAuthStatusActionCreator({ loading: true }));
  const response = yield call(api.auth.queries.logoutFirebaseRequest);
  if (response && response.error) {
    // handle error
    yield put(actions.setAuthStatusActionCreator({ loading: false }));
    return;
  }
  yield put(actions.setAuthStatusActionCreator({ loading: false }));
}

/**
 * Get current Hero saga
 *
 * @param {GetCurrentHeroAction} action
 */
export function* getCurrentHeroSaga(action: GetCurrentHeroAction) {
  const hero: Hero = yield call(api.auth.queries.meAPIRequest);
  yield put(actions.setHeroActionCreator(hero));
  // const activeTools = yield call(activeToolsForHero, hero);
  // yield put(setActiveToolBeaconsActionCreator(activeTools));
}

export default [
  takeLatest(AuthActionConstants.GET_CURRENT_HERO, getCurrentHeroSaga),
  takeLatest(AuthActionConstants.SIGN_IN_WITH_GOOGLE, signInWithGoogleSaga),
  takeLatest(AuthActionConstants.LOGOUT, logoutSaga),
];
