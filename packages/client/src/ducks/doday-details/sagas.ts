import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  setSelectedDodayActionCreator,
  FetchSelectedProgressAction,
  RequestForSetUpdatesAction,
  setUpdatesForSelectedDodayActionCreator,
  setDirtyStatusActionCreator,
} from './actions';
import { api } from '@root/services';
import { ProgressLike, DodayLike } from '@root/tools/types';
import { isDirty } from '@root/lib/utils';
import { selectedDoday, updatesSelector } from './selectors';

/**
 * Fetch selected published Doday node saga
 *
 * @param {FetchSelectedDodayAction} action
 */
export function* fetchSelectedDodayActionSaga(
  action: FetchSelectedDodayAction
) {
  const doday = yield call(api.dodays.queries.fetchDodayByDID, action.payload);
  yield put(setSelectedDodayActionCreator(doday));
}

/**
 * Fetch selected Doday with Progress node saga
 *
 * @param {FetchSelectedProgressAction} action
 */
export function* fetchSelectedProgressActionSaga(
  action: FetchSelectedProgressAction
) {
  const doday = yield call(
    api.dodays.queries.fetchDodayWithProgressByDID,
    action.payload
  );
  yield put(setSelectedDodayActionCreator(doday));
}

/**
 * Set dirty status when new updates for selected
 * doday is coming
 *
 * @param {RequestForSetUpdatesAction} action
 */
export function* setUpdatesAndDirtyStatusSaga(
  action: RequestForSetUpdatesAction
) {
  yield put(setUpdatesForSelectedDodayActionCreator(action.payload.progress));
  const updates: Partial<ProgressLike> = yield select(updatesSelector);
  const selected: DodayLike = yield select(selectedDoday);
  const dirty = yield call(isDirty, selected, updates);
  yield put(setDirtyStatusActionCreator(dirty));
}

export default [
  takeLatest(
    ActionConstants.FETCH_SELECTED_DODAY,
    fetchSelectedDodayActionSaga
  ),
  takeLatest(
    ActionConstants.FETCH_SELECTED_PROGRESS,
    fetchSelectedProgressActionSaga
  ),
  takeLatest(
    ActionConstants.REQUEST_FOR_SET_UPDATES,
    setUpdatesAndDirtyStatusSaga
  ),
];
