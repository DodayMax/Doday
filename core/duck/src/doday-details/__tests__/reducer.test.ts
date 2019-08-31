import reducer from '../reducer';
import actions from '../actions';
import { activity } from '@doday/lib';

describe('DodayDetails reducers', () => {
  it('set DodayDetails loading state reducer', () => {
    const value = true;
    expect(
      reducer(
        undefined,
        actions.setDodayDetailsLoadingStateActionCreator(value)
      ).loading
    ).toBe(value);
  });

  it('set selected doday to store', () => {
    expect(
      reducer(undefined, actions.setSelectedDodayActionCreator(activity))
        .selectedDoday
    ).toBe(activity);
  });

  it('update selected doday in store', () => {
    const date = new Date('2019-02-16');
    const updates = {
      progress: {
        completed: true,
        date,
      },
    };
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actions.updateSelectedDodayActionCreator(updates)
    );
    expect(newState.selectedDoday!.progress!.completed).toEqual(
      updates.progress.completed
    );
    expect(newState.selectedDoday!.progress!.date).toEqual(
      updates.progress.date
    );
  });

  it('clear progress when undefined is passed for updates in store', () => {
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actions.updateSelectedDodayActionCreator()
    );
    expect(newState.selectedDoday!.progress).toEqual(undefined);
  });

  it('clear selected doday from store', () => {
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actions.clearSelectedDodayActionCreator()
    );
    expect(newState.selectedDoday).toEqual(undefined);
  });
});
