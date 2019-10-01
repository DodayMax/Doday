import { call, put, takeLatest } from 'redux-saga/effects';
import api from '@doday/api';
import actions, {
  FetchPublicDodaysForStoreAction,
  StoreActionConstants,
  SearchPublicDodaysForStoreAction,
} from './actions';

/**
 * Fetch public dodays for store
 *
 * @param {FetchPublicDodaysForStoreAction} action
 */
export function* fetchPublicDodaysForStoreActionSaga(
  action: FetchPublicDodaysForStoreAction
) {
  yield put(actions.setStoreLoadingStateActionCreator(true));
  const count =
    action.payload.skip != null
      ? undefined
      : yield call(api.dodays.queries.fetchDodaysCount, action.payload);
  const res = yield call(api.dodays.queries.fetchDodays, action.payload);

  yield put(
    actions.setPublicDodaysForStoreActionCreator(
      res,
      !!action.payload.skip,
      count
    )
  );
  yield put(actions.setStoreLoadingStateActionCreator(false));
}

/**
 * Search public dodays for store
 *
 * @param {SearchPublicDodaysForStoreAction} action
 */
export function* searchPublicDodaysForStoreActionSaga(
  action: SearchPublicDodaysForStoreAction
) {
  yield put(actions.setPublicDodaysForStoreActionCreator([]));
  yield put(actions.setStoreLoadingStateActionCreator(true));
  const count =
    action.payload.skip != null
      ? undefined
      : yield call(api.dodays.queries.searchDodaysCount, action.payload);
  const res = yield call(api.dodays.queries.searchDodays, action.payload);

  yield put(
    actions.setPublicDodaysForStoreActionCreator(
      res,
      !!action.payload.skip,
      count
    )
  );
  yield put(actions.setStoreLoadingStateActionCreator(false));
}

export default [
  takeLatest(
    StoreActionConstants.FETCH_DODAYS_WITH_PARAMS,
    fetchPublicDodaysForStoreActionSaga
  ),
  takeLatest(
    StoreActionConstants.SEARCH_DODAYS_WITH_PARAMS,
    searchPublicDodaysForStoreActionSaga
  ),
];
