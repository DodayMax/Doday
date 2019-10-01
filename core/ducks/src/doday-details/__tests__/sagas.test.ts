import { call, put, select } from 'redux-saga/effects';
import api from '@doday/api';
import actions, {
  FetchSelectedDodayAction,
  DodayDetailsActionConstants,
  FetchSelectedProgressAction,
  RequestForSetUpdatesAction,
} from '../actions';
import {
  fetchSelectedDodayActionSaga,
  fetchSelectedProgressActionSaga,
  setUpdatesAndDirtyStatusSaga,
} from '../sagas';
import { updatesSelector, selectedDodaySelector } from '../selectors';
import { activity, ProgressLike, isDirty } from '@doday/lib';

describe("Test DodayDetails's sagas", () => {
  it('fetchSelectedDodayActionSaga', () => {
    const action: FetchSelectedDodayAction = {
      type: DodayDetailsActionConstants.FETCH_SELECTED_DODAY,
      payload: activity.did,
    };
    const gen = fetchSelectedDodayActionSaga(action);
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodayByDID, action.payload)
    );
    expect(gen.next(activity).value).toEqual(
      put(actions.setSelectedDodayActionCreator(activity))
    );
    expect(gen.next().done).toBe(true);
  });

  it('fetchSelectedProgressActionSaga', () => {
    const action: FetchSelectedProgressAction = {
      type: DodayDetailsActionConstants.FETCH_SELECTED_PROGRESS,
      payload: activity.did,
    };
    const gen = fetchSelectedProgressActionSaga(action);
    expect(gen.next().value).toEqual(
      put(actions.clearDodayDetailsDirtyStuffActionCreator())
    );
    expect(gen.next().value).toEqual(
      call(api.dodays.queries.fetchDodayWithProgressByDID, action.payload)
    );
    expect(gen.next(activity).value).toEqual(
      put(actions.setSelectedDodayActionCreator(activity))
    );
    expect(gen.next().done).toBe(true);
  });

  it('setUpdatesAndDirtyStatusSaga', () => {
    const updates: Partial<ProgressLike> = {
      completed: false,
    };
    const action: RequestForSetUpdatesAction = {
      type: DodayDetailsActionConstants.REQUEST_FOR_SET_UPDATES,
      payload: {
        progress: updates,
      },
    };
    const gen = setUpdatesAndDirtyStatusSaga(action);
    const dirty = isDirty(activity, action.payload!.progress!);
    expect(gen.next().value).toEqual(
      put(
        actions.setUpdatesForSelectedDodayActionCreator(
          action.payload!.progress!
        )
      )
    );
    expect(gen.next().value).toEqual(select(updatesSelector));
    expect(gen.next(updates as any).value).toEqual(
      select(selectedDodaySelector)
    );
    expect(gen.next(activity).value).toEqual(call(isDirty, activity, updates));
    expect(gen.next(dirty as any).value).toEqual(
      put(actions.setDirtyStatusActionCreator(dirty))
    );
    expect(gen.next().done).toBe(true);
  });
});
