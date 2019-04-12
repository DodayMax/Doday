import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  FetchSelectedDodayAction,
  setSelectedDodayActionCreator,
  FetchSelectedGoalAction,
  setSelectedGoalActionCreator,
} from './actions';
import { api } from '@root/services';

/**
 * Fetch selected doday saga
 *
 * @param {FetchSelectedDodayAction} action
 */
function* fetchSelectedDodaySaga(action: FetchSelectedDodayAction) {
  const progress = yield call(api.dodays.queries.dodayProgressByDID, {
    did: action.payload,
  });
  yield put(setSelectedDodayActionCreator(progress));
}

/**
 * Fetch selected goal saga
 *
 * @param {FetchSelectedGoalAction} action
 */
function* FetchSelectedGoalSaga(action: FetchSelectedGoalAction) {
  const goal = yield call(api.goals.queries.goalByDID, {
    did: action.payload,
  });
  yield put(setSelectedGoalActionCreator(goal));
}

export default [
  takeLatest(ActionConstants.FETCH_SELECTED_DODAY, fetchSelectedDodaySaga),
  takeLatest(ActionConstants.FETCH_SELECTED_GOAL, FetchSelectedGoalSaga),
];
