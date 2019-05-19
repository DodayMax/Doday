import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '@root/services';
import {
  FetchPublicDodaysForStoreAction,
  ActionConstants,
  setPublicDodaysForStoreActionCreator,
} from './actions';

/**
 * Fetch public dodays for store
 *
 * @param {FetchPublicDodaysForStoreAction} action
 */
export function* fetchPublicDodaysForStoreActionSaga(
  action: FetchPublicDodaysForStoreAction
) {
  const res = yield call(api.dodays.queries.fetchDodays, action.payload);

  yield put(setPublicDodaysForStoreActionCreator(res));
}

export default [
  takeLatest(
    ActionConstants.FETCH_DODAYS_WITH_PARAMS,
    fetchPublicDodaysForStoreActionSaga
  ),
];
