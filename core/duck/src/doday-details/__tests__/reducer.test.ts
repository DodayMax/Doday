import reducer from '../reducer';
import { actionCreators } from '../actions';
import { activity } from '@root/lib/common-interfaces/fake-data';

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
      actionCreators.updateSelectedDodayActionCreator(updates)
    );
    expect(newState.selectedDoday.progress.completed).toEqual(
      updates.progress.completed
    );
    expect(newState.selectedDoday.progress.date).toEqual(updates.progress.date);
  });

  it('clear progress when undefined is passed for updates in store', () => {
    const newState = reducer(
      {
        loading: false,
        selectedDoday: activity,
      },
      actionCreators.updateSelectedDodayActionCreator()
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
});
