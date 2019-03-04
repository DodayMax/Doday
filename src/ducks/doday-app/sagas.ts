import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionConstants, setDodaysForDate, FetchDodayForDate, ChangeDateAction, setDodaysBadgeForToday, setLoadingState, FetchAllGoals, setGoals } from './actions';
import { chosenDate } from '@ducks/all-selectors';
import { api } from '@services';
import { isToday } from '@root/lib/utils';
import { Doday } from '@root/lib/common-interfaces';

/**
 * Fetch dodays for chosen date saga
 *
 * @export
 * @param {FetchDodayForDate} action
 */
function* fetchDodayForDateSaga(action: FetchDodayForDate) {
  // get chosen date from store
  yield put(setLoadingState(true));
  const date = yield select(chosenDate);
  if (isToday(date)) {
    const dodays = yield call(api.dodays.queries.dodaysForToday, {});
    yield put(setDodaysBadgeForToday(dodays.filter((doday: Doday) => !doday.completed).length));
    yield put(setDodaysForDate(dodays));
  } else {
    const dodays = yield call(api.dodays.queries.dodaysForDate, { date });
    yield put(setDodaysForDate(dodays));
  }
  yield put(setLoadingState(false));
}

/**
 * Fetch all goals saga
 *
 * @export
 * @param {FetchAllGoals} action
 */
function* fetchAllGoalsSaga(action: FetchAllGoals) {
  // get chosen date from store
  yield put(setLoadingState(true));
  const goals = yield call(api.goals.queries.allGoals, {});
  yield put(setGoals(goals));
  yield put(setLoadingState(false));
}

export default [
  takeLatest(ActionConstants.FETCH_DODAYS_FOR_DATE, fetchDodayForDateSaga),
  takeLatest(ActionConstants.CHANGE_DATE, fetchDodayForDateSaga),
  takeLatest(ActionConstants.FETCH_ALL_GOALS, fetchAllGoalsSaga),
];