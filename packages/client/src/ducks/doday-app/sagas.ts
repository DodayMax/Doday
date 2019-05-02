import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActionConstants } from './actions';
import { chosenDate, myDID } from '@ducks/all-selectors';
import { api } from '@services';
import { setDodayDetailsLoadingStateActionCreator } from '../doday-details/actions';
import { navStack, goalByDIDFromStore } from './selectors';

/**
 * Fetch dodays for chosen date saga
 *
 * @param {FetchDodaysAction} action
 */
function* fetchDodaysActionSaga(action: FetchDodaysAction) {
  yield put(setAppLoadingState(true));
  const date: Date = yield select(chosenDate);
  const dodays = yield call(
    api.dodays.queries.fetchActiveDodays,
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
 * Fetch public dodays
 *
 * @param {FetchPublicDodaysAction} action
 */
function* FetchPublicDodaysActionSaga(action: FetchPublicDodaysAction) {
  yield put(setAppLoadingState(true));
  const dodays = yield call(api.dodays.queries.fetchPublicDodays);
  yield put(setPublicDodaysActionCreator(dodays));
  yield put(setAppLoadingState(false));
}

/**
 * Fetch all goals saga
 *
 * @param {FetchAllGoals} action
 */
function* fetchAllGoalsSaga(action: FetchAllGoalsAction) {
  yield put(setAppLoadingState(true));
  const did = yield select(myDID);
  const goals = yield call(api.goals.queries.fetchGoals, { ownerDID: did });
  yield put(setGoalsActionCreator(goals));
  yield put(setAppLoadingState(false));
}

/**
 * When new goals updates here = update navStack as well
 * @param {SetGoalsAction} action
 */
function* setGoalsSaga(action: SetGoalsAction) {
  const stack = yield select(navStack);
  const newGoals = action.payload;
  const stackDIDs = stack.map(goal => goal.did);
  yield put(
    setToNavStackActionCreator(
      newGoals.filter(
        goal => stackDIDs.filter(did => did === goal.did).length > 0
      )
    )
  );
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
  yield put(fetchAllGoalsActionCreator());
  yield put(setAppLoadingState(false));
}

/**
 * Delete goal saga
 *
 * @param {DeleteGoalAction} action
 */
function* deleteGoalSaga(action: DeleteGoalAction) {
  yield put(setAppLoadingState(true));
  yield call(api.goals.mutations.deleteGoal, action.payload);
  yield put(fetchDodaysForDate());
  yield put(fetchAllGoalsActionCreator());
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
  yield put(fetchAllGoalsActionCreator());
  if (action.payload.updates.date) {
    yield put(changeDateActionCreator(new Date(action.payload.updates.date)));
  }
  yield put(setDodayDetailsLoadingStateActionCreator(false));
  yield put(setAppLoadingState(false));
}

/**
 * Find goal by DID and push it to nav stack saga
 *
 * @param {PushToNavigationStackByDIDAction} action
 */
function* pushToNavStackByDIDSaga(action: PushToNavigationStackByDIDAction) {
  const goal = yield select(goalByDIDFromStore, action.payload);
  if (goal) {
    yield put(changePath('goals'));
    yield put(setToNavStackActionCreator([goal]));
  }
}

/**
 * Plan out saga
 *
 * @param {PlanOutAction} action
 */
function* planOutSaga(action: PlanOutAction) {
  yield put(setAppLoadingState(true));
  yield call(api.days.queries.planOutStartFromDate, action.payload);
  yield put(fetchDodaysForDate());
  yield put(fetchAllGoalsActionCreator());
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
  switch (action.payload) {
    case 'public':
      yield put(fetchPublicDodaysActionCreator());
      break;
    default:
      break;
  }
  yield put(setAppLoadingState(false));
}

export default [
  takeLatest(ActionConstants.FETCH_DODAYS_FOR_DATE, fetchDodaysActionSaga),
  takeLatest(ActionConstants.FETCH_PUBLIC_DODAYS, FetchPublicDodaysActionSaga),
  takeLatest(ActionConstants.CHANGE_DATE, fetchDodayForDateSaga),
  takeLatest(ActionConstants.FETCH_ALL_GOALS, fetchAllGoalsSaga),
  takeLatest(ActionConstants.SET_GOALS, setGoalsSaga),
  takeLatest(ActionConstants.PUSH_TO_NAV_STACK_BY_DID, pushToNavStackByDIDSaga),
  takeLatest(ActionConstants.TOGGLE_DODAY, toggleDodaySaga),
  takeLatest(ActionConstants.UPDATE_DODAY, updateDodaySaga),
  takeLatest(ActionConstants.DELETE_DODAY, deleteDodaySaga),
  takeLatest(ActionConstants.REMOVE_DODAY, removeDodaySaga),
  takeLatest(ActionConstants.DELETE_GOAL, deleteGoalSaga),
  takeLatest(ActionConstants.PLAN_OUT, planOutSaga),
  takeLatest(ActionConstants.CHANGE_PATH, changePathSaga),
];
