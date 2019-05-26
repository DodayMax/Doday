import { selectedDoday, updatesSelector } from '../selectors';
import { rootState } from '@root/lib/common-interfaces/fake-data';

describe('DodayDetails selectors', () => {
  it('Get updates for selected doday', () => {
    expect(updatesSelector(rootState)).toEqual(rootState.dodayDetails.updates);
  });

  it('Get selected doday', () => {
    expect(selectedDoday(rootState)).toEqual(
      rootState.dodayDetails.selectedDoday
    );
  });
});
