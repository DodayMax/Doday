import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  ActionConstants,
  CreateAndTakeActivityAction,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
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
function* createActivityActionSaga(action: CreateActivityAction) {
  yield put(setBuilderLoadingState(true));
  const res = yield call(
    api.dodays.mutations.createDodayMutation,
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
 * Take Doday
 *
 * @param {TakeActivityAction} action
 */
function* takeActivityActionSaga(action: TakeActivityAction) {
  yield put(setDodayDetailsLoadingStateActionCreator(true));
  const res = yield call(
    api.activities.mutations.takeActivityMutation,
    action.payload
  );
  if (res.status === 200) {
    yield put(fetchDodaysForDate());
  }
  yield put(setDodayDetailsLoadingStateActionCreator(false));
}

/**
 * Create Doday and Progress node saga
 *
 * @param {CreateAndTakeActivityAction} action
 */
function* createAndTakeActivityActionSaga(action: CreateAndTakeActivityAction) {
  yield put(setBuilderLoadingState(true));
  const res = yield call(
    api.activities.mutations.createAndTakeActivityMutation,
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
  takeLatest(ActionConstants.CREATE_ACTIVITY, createActivityActionSaga),
  takeLatest(ActionConstants.TAKE_ACTIVITY, takeActivityActionSaga),
  takeLatest(
    ActionConstants.CREATE_AND_TAKE_ACTIVITY,
    createAndTakeActivityActionSaga
  ),
  takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga),
];
