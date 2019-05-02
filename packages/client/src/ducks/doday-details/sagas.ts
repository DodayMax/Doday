import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  setDirtyStatusActionCreator,
  RequestForSetUpdatesAction,
  setUpdatesForSelectedDodayActionCreator,
  FetchSelectedProgressAction,
} from './actions';
import { api } from '@root/services';
import { updatesSelector, selectedDoday } from './selectors';
import { isEmptyObject } from '@root/lib/utils';

/**
 * Fetch selected doday saga
 *
 * @param {FetchSelectedDodayAction} action
 */
function* fetchSelectedDodaySaga(action: FetchSelectedDodayAction) {
  // const doday = yield call(api.dodays.queries.getDodayByDID, {
  //   did: action.payload,
  // });
  // yield put(setSelectedDodayActionCreator(doday));
}

/**
 * Fetch selected doday saga
 *
 * @param {FetchSelectedProgressAction} action
 */
function* fetchSelectedProgressSaga(action: FetchSelectedProgressAction) {
  // const progress = yield call(api.dodays.queries.dodayProgressByDID, {
  //   did: action.payload,
  // });
  // yield put(setSelectedDodayActionCreator(progress));
}

/**
 * Set dirty status when new updates for selected
 * doday is coming
 *
 * @param {RequestForSetUpdatesAction} action
 */
function* setUpdatesAndDirtyStatusSaga(action: RequestForSetUpdatesAction) {
  // yield put(setUpdatesForSelectedDodayActionCreator(action.payload));
  // const updates: Partial<SerializedDoday> = yield select(updatesSelector);
  // const selected: Doday = yield select(selectedDoday);
  // const dirty =
  //   !isEmptyObject(updates) &&
  //   (updates.dateIsLocked !== selected.dateIsLocked ||
  //     updates.date != null ||
  //     updates.relatedGoal != null);
  // yield put(setDirtyStatusActionCreator(dirty));
}

export default [
  takeLatest(ActionConstants.FETCH_SELECTED_DODAY, fetchSelectedDodaySaga),
  takeLatest(
    ActionConstants.FETCH_SELECTED_PROGRESS,
    fetchSelectedProgressSaga
  ),
  takeLatest(
    ActionConstants.REQUEST_FOR_SET_UPDATES,
    setUpdatesAndDirtyStatusSaga
  ),
];
