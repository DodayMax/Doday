import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  setDodaysForDate,
  FetchDodayForDate,
  setDodaysBadgeForToday,
  setAppLoadingState,
  FetchAllGoals,
  setGoals,
  ToggleDodayAction,
  fetchDodaysForDate,
  RemoveDodayAction,
  UpdateDodayAction,
  changeDateActionCreator,
} from './actions';
import { chosenDate } from '@ducks/all-selectors';
import { api } from '@services';
import { Doday } from '@root/lib/models/entities/Doday';
import { setDodayDetailsLoadingStateActionCreator } from '../doday-details/actions';

/**
 * Fetch dodays for chosen date saga
 *
 * @param {FetchDodayForDate} action
 */
function* fetchDodayForDateSaga(action: FetchDodayForDate) {
  yield put(setAppLoadingState(true));
  const date: Date = yield select(chosenDate);
  const dodays = yield call(
    api.dodays.queries.fetchActiveDodaysForDate,
    date.getTime()
  );
  yield put(
    setDodaysBadgeForToday(
      dodays && dodays.filter((doday: Doday) => !doday.completed).length
    )
  );
  yield put(setDodaysForDate(dodays));
  yield put(setAppLoadingState(false));
}

/**
 * Fetch all goals saga
 *
 * @param {FetchAllGoals} action
 */
function* fetchAllGoalsSaga(action: FetchAllGoals) {
  yield put(setAppLoadingState(true));
  const goals = yield call(api.goals.queries.allGoals, {});
  yield put(setGoals(goals));
  yield put(setAppLoadingState(false));
}

/**
 * Toggle doday saga
 *
 * @param {ToggleDodayAction} action
 */
function* toggleDodaySaga(action: ToggleDodayAction) {
  yield call(api.dodays.mutations.toggleDoday, {
    did: action.payload.did,
    value: !action.payload.completed,
  });
  yield put(fetchDodaysForDate());
}

/**
 * Delete doday saga
 *
 * @param {ToggleDodayAction} action
 */
function* deleteDodaySaga(action: ToggleDodayAction) {
  yield put(setAppLoadingState(true));
  yield call(api.dodays.mutations.deleteDoday, action.payload.did);
  yield put(fetchDodaysForDate());
  yield put(setAppLoadingState(false));
}

/**
 * Remove doday from app saga
 *
 * @param {RemoveDodayAction} action
 */
function* removeDodaySaga(action: RemoveDodayAction) {
  yield put(setAppLoadingState(true));
  yield call(api.dodays.mutations.removeDoday, action.payload.did);
  yield put(fetchDodaysForDate());
  yield put(setAppLoadingState(false));
}

/**
 * Update doday saga
 *
 * @param {UpdateDodayAction} action
 */
function* updateDodaySaga(action: UpdateDodayAction) {
  yield put(setAppLoadingState(true));
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  yield call(api.dodays.mutations.updateDoday, action.payload);
  yield put(fetchDodaysForDate());
  if (action.payload.updates.date) {
    yield put(changeDateActionCreator(new Date(action.payload.updates.date)));
  }
  yield put(setDodayDetailsLoadingStateActionCreator(false));
  yield put(setAppLoadingState(false));
}

export default [
  takeLatest(ActionConstants.FETCH_DODAYS_FOR_DATE, fetchDodayForDateSaga),
  takeLatest(ActionConstants.CHANGE_DATE, fetchDodayForDateSaga),
  takeLatest(ActionConstants.FETCH_ALL_GOALS, fetchAllGoalsSaga),
  takeLatest(ActionConstants.TOGGLE_DODAY, toggleDodaySaga),
  takeLatest(ActionConstants.UPDATE_DODAY, updateDodaySaga),
  takeLatest(ActionConstants.DELETE_DODAY, deleteDodaySaga),
  takeLatest(ActionConstants.REMOVE_DODAY, removeDodaySaga),
];
