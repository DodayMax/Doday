import { isDrawerCollapsedSelector } from '../selectors';
import { rootState } from '@doday/lib';

describe("Test hero-settings's selectors", () => {
  it('isDrawerCollapsed selector returns correct value', () => {
    expect(isDrawerCollapsedSelector(rootState)).toEqual(
      rootState.heroSettings.isDrawerCollapsed
    );
  });
});
