import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ActionConstants,
  PlanOutAction,
  setAppLoadingState,
  ChangePathAction,
  ChangeDodayAppDateAction,
  FetchDodaysWithProgressForDateAction,
  fetchDodaysWithProgressForDateActionCreator,
  setDodaysActionCreator,
} from './actions';
import { api } from '@services';
import { chosenDate } from './selectors';
import { isToday } from '@root/lib/utils';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';

/**
 * Fetch dodays with Progress nodes for date
 *
 * @param {FetchDodaysWithProgressForDateAction} action
 */
function* fetchDodaysWithProgressForDateActionSaga(
  action: FetchDodaysWithProgressForDateAction
) {
  yield put(setAppLoadingState(true));
  const date: Date = yield select(chosenDate);
  const params: DodaysWithProgressQueryParams = {
    completed: false,
  };
  if (isToday(date)) {
    params.exactDate = date.getTime();
  } else {
    params.date = date.getTime();
  }
  const dodays = yield call(api.dodays.queries.fetchDodaysWithProgress, params);
  yield put(setDodaysActionCreator(dodays));
  yield put(setAppLoadingState(false));
}

/**
 * Plan out saga
 *
 * @param {PlanOutAction} action
 */
function* planOutSaga(action: PlanOutAction) {
  yield put(setAppLoadingState(true));
  yield call(api.days.queries.planOutStartFromDate, action.payload);
  yield put(fetchDodaysWithProgressForDateActionCreator());
  yield put(setAppLoadingState(false));
}

/**
 * Change doday app path
 * Fetch appropriate data
 *
 * @param {ChangePathAction} action
 */
function* changePathSaga(action: ChangePathAction) {
  yield put(setAppLoadingState(true));
  yield put(setAppLoadingState(false));
}

/**
 * Fetch appropriate data when chosen date changed
 *
 * @param {ChangeDodayAppDateAction} action
 */
function* changeDodayAppDateActionSaga(action: ChangeDodayAppDateAction) {
  yield put(setAppLoadingState(true));
  yield put(fetchDodaysWithProgressForDateActionCreator(action.payload));
  yield put(setAppLoadingState(false));
}

export default [
  takeLatest(
    ActionConstants.FETCH_DODAYS_WITH_PROGRESS_FOR_DATE,
    fetchDodaysWithProgressForDateActionSaga
  ),
  takeLatest(ActionConstants.CHANGE_DATE, changeDodayAppDateActionSaga),
  takeLatest(ActionConstants.PLAN_OUT, planOutSaga),
  takeLatest(ActionConstants.CHANGE_PATH, changePathSaga),
];
