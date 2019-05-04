import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  PlanOutAction,
  setAppLoadingState,
  ChangePathAction,
  ChangeDodayAppDateAction,
} from './actions';
import { api } from '@services';
import { fetchDodaysWithProgressActionCreator } from '../api/dodays-api-actions/actions';

/**
 * Plan out saga
 *
 * @param {PlanOutAction} action
 */
function* planOutSaga(action: PlanOutAction) {
  yield put(setAppLoadingState(true));
  yield call(api.days.queries.planOutStartFromDate, action.payload);
  yield put(fetchDodaysWithProgressActionCreator());
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
  yield put(
    fetchDodaysWithProgressActionCreator({ date: action.payload.getTime() })
  );
  yield put(setAppLoadingState(false));
}

export default [
  takeLatest(ActionConstants.CHANGE_DATE, changeDodayAppDateActionSaga),
  takeLatest(ActionConstants.PLAN_OUT, planOutSaga),
  takeLatest(ActionConstants.CHANGE_PATH, changePathSaga),
];
