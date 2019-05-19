import reducer from '../reducer';
import { actionCreators } from '../actions';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { ProgressLike } from '@root/tools/types';

describe('DodayDetails reducers', () => {
  it('set DodayDetails loading state reducer', () => {
    const value = true;
    expect(
      reducer(
        undefined,
        actionCreators.setDodayDetailsLoadingStateActionCreator(value)
      ).loading
    ).toBe(value);
  });

  it('set selected doday to store', () => {
    expect(
      reducer(undefined, actionCreators.setSelectedDodayActionCreator(activity))
        .selectedDoday
    ).toBe(activity);
  });

  it('update selected doday in store', () => {
    const date = new Date('2019-02-16');
    const updates: Partial<ProgressLike> = {
      completed: true,
      date,
    };
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actionCreators.updateSelectedDodayProgressActionCreator(updates)
    );
    expect(newState.selectedDoday.progress.completed).toEqual(
      updates.completed
    );
    expect(newState.selectedDoday.progress.date).toEqual(updates.date);
  });

  it('clear progress when undefined is passed for updates in store', () => {
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actionCreators.updateSelectedDodayProgressActionCreator()
    );
    expect(newState.selectedDoday.progress).toEqual(undefined);
  });

  it('clear selected doday from store', () => {
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actionCreators.clearSelectedDodayActionCreator()
    );
    expect(newState.selectedDoday).toEqual(undefined);
  });

  it('set dirty status when some there are some updates', () => {
    const status = true;
    const newState = reducer(
      undefined,
      actionCreators.setDirtyStatusActionCreator(status)
    );
    expect(newState.dirty).toEqual(true);
  });

  it('set updates to store after updates request', () => {
    const updates: Partial<ProgressLike> = {
      completed: true,
    };
    const newState = reducer(
      undefined,
      actionCreators.setUpdatesForSelectedDodayActionCreator(updates)
    );
    expect(newState.updates).toEqual(updates);
  });

  it('clear updates and dirty flag', () => {
    const updates: Partial<ProgressLike> = {
      completed: true,
    };
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
        updates,
      },
      actionCreators.clearDodayDetailsDirtyStuffActionCreator()
    );
    expect(newState.updates).toEqual(undefined);
    expect(newState.dirty).toEqual(undefined);
  });
});
