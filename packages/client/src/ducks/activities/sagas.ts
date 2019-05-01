import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ActionConstants,
  CreateAndTakeActivityAction,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
  clearActivitiesBuilderActionCreator,
  CreateActivityAction,
  TakeActivityAction,
} from './actions';
import {
  setBuilderLoadingState,
  setBuilderSuccessFlag,
  clearBuilderActionCreator,
} from '../builder/actions';
import {
  fetchDodaysForDate,
  fetchAllGoalsActionCreator,
} from '@ducks/doday-app/actions';
import { api } from '@services';
import { detectActivityType } from '@root/lib/utils/regexp';
import { parseMetadataFromUrl } from '@root/lib/utils/api-utils';
import { setDodayDetailsLoadingStateActionCreator } from '../doday-details/actions';

/**
 * Create Activity(Doday) node and relation to Hero
 *
 * @param {CreateActivityAction} action
 */
function* createActivitySaga(action: CreateActivityAction) {
  yield put(setBuilderLoadingState(true));
  const res = yield call(api.dodays.mutations.createDodayNode, action.payload);
  if (res.status === 200) {
    yield put(setBuilderSuccessFlag(true));
    yield put(fetchDodaysForDate());
    yield put(fetchAllGoalsActionCreator());
  }
  yield put(setBuilderLoadingState(false));
  yield put(clearBuilderActionCreator());
}

/**
 * Take Doday
 *
 * @param {TakeDodayAction} action
 */
function* takeDodaySaga(action: TakeDodayAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  const res = yield call(api.dodays.mutations.takeDoday, action.payload);
  if (res.status === 200) {
    yield put(fetchDodaysForDate());
    yield put(fetchAllGoalsActionCreator());
  }
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Create Doday and Progress node saga
 *
 * @param {CreateAndTakeDodayAction} action
 */
function* createAndTakeDodaySaga(action: CreateAndTakeDodayAction) {
  yield put(setBuilderLoadingState(true));
  const res = yield call(
    api.dodays.mutations.createAndTakeDodayNode,
    action.payload
  );
  if (res.status === 200) {
    yield put(setBuilderSuccessFlag(true));
    yield put(fetchDodaysForDate());
    yield put(fetchAllGoalsActionCreator());
  }
  yield put(setBuilderLoadingState(false));
  yield put(clearBuilderActionCreator());
}

/**
 * Create Goal node saga
 *
 * @param {CreateGoalAction} action
 */
function* createGoalSaga(action: CreateGoalAction) {
  yield put(setBuilderLoadingState(true));
  const res = yield call(api.dodays.mutations.createGoal, action.payload);
  if (res.status === 200) {
    yield put(setBuilderSuccessFlag(true));
    yield put(fetchAllGoalsActionCreator());
  }
  yield put(setBuilderLoadingState(false));
  yield put(clearBuilderActionCreator());
}

/**
 * Fetch activity types for builder saga
 *
 * @param {ParseUrlMetadataAction} action
 */
function* parseUrlMetadataSaga(action: ParseUrlMetadataAction) {
  yield put(setUrlParsingProgressActionCreator(true));
  const metadata = yield call(parseMetadataFromUrl, action.payload);
  const activityType = detectActivityType(metadata);
  if (metadata) {
    yield put(setParsedUrlMetadataObjectActionCreator(metadata));
    yield put(setActivityTypeActionCreator(activityType));
  }
  yield put(setUrlParsingProgressActionCreator(false));
}

export default [
  takeLatest(ActionConstants.CREATE_DODAY, createDodaySaga),
  takeLatest(ActionConstants.TAKE_DODAY, takeDodaySaga),
  takeLatest(ActionConstants.CREATE_AND_TAKE_DODAY, createAndTakeDodaySaga),
  takeLatest(ActionConstants.CREATE_GOAL, createGoalSaga),
  takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga),
];
