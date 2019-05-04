import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionConstants,
  ParseUrlMetadataAction,
  setUrlParsingProgressActionCreator,
  setParsedUrlMetadataObjectActionCreator,
  setActivityTypeActionCreator,
} from './actions';
import { detectActivityType } from '@root/lib/utils/regexp';
import { parseMetadataFromUrl } from '@root/lib/utils/api-utils';

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

export default [takeLatest(ActionConstants.PARSE_URL, parseUrlMetadataSaga)];
