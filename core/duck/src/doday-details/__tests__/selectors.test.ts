import { selectedDoday, updatesSelector } from '../selectors';
import { rootState } from '@doday/lib';

describe('DodayDetails selectors', () => {
  it('Get updates for selected doday', () => {
    expect(updatesSelector(rootState)).toEqual(rootState.details.updates);
  });

  it('Get selected doday', () => {
    expect(selectedDoday(rootState)).toEqual(rootState.details.selectedDoday);
  });
});
