import { call, put, takeLatest, all } from 'redux-saga/effects';
import actions, {
  AuthActionConstants,
  SignInWithGoogleAction,
  LogoutAction,
  GetCurrentHeroAction,
} from './actions';
import { Hero } from '@doday/lib';
import {
  signinAPIRequest,
  signInWithGoogleFirebaseRequest,
  logoutFirebaseRequest,
  meAPIRequest,
} from '@doday/requests';

/**
 * Auth with Google saga
 *
 * @param {SignInWithGoogleAction} action
 */
export function* signInWithGoogleSaga(action: SignInWithGoogleAction) {
  yield put(actions.setAuthStatusActionCreator({ loading: true }));
  const response = yield call(signInWithGoogleFirebaseRequest);
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
  const response = yield call(logoutFirebaseRequest);
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
  const hero: Hero = yield call(meAPIRequest);
  yield put(actions.setHeroActionCreator(hero));
}

export default function* runAuthSagas() {
  yield all([
    takeLatest(AuthActionConstants.GET_CURRENT_HERO, getCurrentHeroSaga),
    takeLatest(AuthActionConstants.SIGN_IN_WITH_GOOGLE, signInWithGoogleSaga),
    takeLatest(AuthActionConstants.LOGOUT, logoutSaga),
  ]);
}
