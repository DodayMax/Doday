import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '@root/services';
import {
  FetchPublicDodaysForStoreAction,
  ActionConstants,
  setPublicDodaysForStoreActionCreator,
  setStoreLoadingStateActionCreator,
} from './actions';

/**
 * Fetch public dodays for store
 *
 * @param {FetchPublicDodaysForStoreAction} action
 */
export function* fetchPublicDodaysForStoreActionSaga(
  action: FetchPublicDodaysForStoreAction
) {
  yield put(setStoreLoadingStateActionCreator(true));
  const count =
    action.payload.skip != null
      ? undefined
      : yield call(api.dodays.queries.fetchDodaysCount, action.payload);
  const res = yield call(api.dodays.queries.fetchDodays, action.payload);

  yield put(
    setPublicDodaysForStoreActionCreator(res, !!action.payload.skip, count)
  );
  yield put(setStoreLoadingStateActionCreator(false));
}

export default [
  takeLatest(
    ActionConstants.FETCH_DODAYS_WITH_PARAMS,
    fetchPublicDodaysForStoreActionSaga
  ),
];
