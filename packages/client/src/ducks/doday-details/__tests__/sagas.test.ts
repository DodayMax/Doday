import { call, put, select } from 'redux-saga/effects';
import { api } from '@root/services';
import { activity } from '@root/lib/common-interfaces/fake-data';
import {
  FetchSelectedDodayAction,
  ActionConstants,
  setSelectedDodayActionCreator,
  FetchSelectedProgressAction,
  RequestForSetUpdatesAction,
  setUpdatesForSelectedDodayActionCreator,
  setDirtyStatusActionCreator,
} from '../actions';
import {
  fetchSelectedDodayActionSaga,
  fetchSelectedProgressActionSaga,
  setUpdatesAndDirtyStatusSaga,
} from '../sagas';
import { SerializedProgressLike } from '@root/tools/types';
import { updatesSelector, selectedDoday } from '../selectors';
import { isDirty } from '@root/lib/utils';
import { deserializeActivityProgress } from '@root/tools/activity/entities/activity';

describe("Test DodayDetails's sagas", () => {
  it('fetchSelectedDodayActionSaga', () => {
    const action: FetchSelectedDodayAction = {
      type: ActionConstants.FETCH_SELECTED_DODAY,
      payload: activity.did,
    };
    const gen = fetchSelectedDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodayByDID, action.payload)
    );
    expect(gen.next(activity).value).toEqual(
      put(setSelectedDodayActionCreator(activity))
    );
    expect(gen.next().done).toBe(true);
  });

  it('fetchSelectedProgressActionSaga', () => {
    const action: FetchSelectedProgressAction = {
      type: ActionConstants.FETCH_SELECTED_PROGRESS,
      payload: activity.did,
    };
    const gen = fetchSelectedProgressActionSaga(action);
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodayWithProgressByDID, action.payload)
    );
    expect(gen.next(activity).value).toEqual(
      put(setSelectedDodayActionCreator(activity))
    );
    expect(gen.next().done).toBe(true);
  });

  it('setUpdatesAndDirtyStatusSaga', () => {
    const updates: Partial<SerializedProgressLike> = {
      completed: false,
    };
    const action: RequestForSetUpdatesAction = {
      type: ActionConstants.REQUEST_FOR_SET_UPDATES,
      payload: {
        progress: updates,
        deserialize: deserializeActivityProgress,
      },
    };
    const gen = setUpdatesAndDirtyStatusSaga(action);
    const deserialized = action.payload.deserialize(action.payload.progress);
    const dirty = isDirty(activity, deserialized);
    expect(gen.next().value).toEqual(
      call(action.payload.deserialize, action.payload.progress)
    );
    expect(gen.next(deserialized).value).toEqual(
      put(setUpdatesForSelectedDodayActionCreator(deserialized))
    );
    expect(gen.next().value).toEqual(select(updatesSelector));
    expect(gen.next(deserialized).value).toEqual(select(selectedDoday));
    expect(gen.next(activity).value).toEqual(
      call(isDirty, activity, deserialized)
    );
    expect(gen.next(dirty).value).toEqual(
      put(setDirtyStatusActionCreator(dirty))
    );
    expect(gen.next().done).toBe(true);
  });
});
