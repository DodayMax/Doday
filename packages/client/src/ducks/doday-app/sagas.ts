import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ActionConstants,
  PlanOutAction,
  ChangeDodayAppDateAction,
  FetchDodaysWithProgressForDateAction,
  fetchDodaysWithProgressForDateActionCreator,
  setDodaysActionCreator,
  setDodayAppLoadingStateActionCreator,
} from './actions';
import { api } from '@services';
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
  yield put(setDodayAppLoadingStateActionCreator(true));
  // const date: Date = yield select(chosenDate);
  const params: DodaysWithProgressQueryParams = {
    completed: false,
  };
  // if (isToday(date)) {
  //   params.exactDate = date.getTime();
  // } else {
  //   params.date = date.getTime();
  // }
  const dodays = yield call(api.dodays.queries.fetchDodaysWithProgress, params);
  yield put(setDodaysActionCreator(dodays));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Plan out saga
 *
 * @param {PlanOutAction} action
 */
function* planOutSaga(action: PlanOutAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield call(api.days.queries.planOutStartFromDate, action.payload);
  yield put(fetchDodaysWithProgressForDateActionCreator());
  yield put(setDodayAppLoadingStateActionCreator(false));
}

/**
 * Fetch appropriate data when chosen date changed
 *
 * @param {ChangeDodayAppDateAction} action
 */
function* changeDodayAppDateActionSaga(action: ChangeDodayAppDateAction) {
  yield put(setDodayAppLoadingStateActionCreator(true));
  yield put(fetchDodaysWithProgressForDateActionCreator(action.payload));
  yield put(setDodayAppLoadingStateActionCreator(false));
}

export default [
  takeLatest(
    ActionConstants.FETCH_DODAYS_WITH_PROGRESS_FOR_DATE,
    fetchDodaysWithProgressForDateActionSaga
  ),
  takeLatest(ActionConstants.CHANGE_DATE, changeDodayAppDateActionSaga),
  takeLatest(ActionConstants.PLAN_OUT, planOutSaga),
];
