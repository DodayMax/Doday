import { isDrawerCollapsed } from '../selectors';
import { rootState } from '@doday/lib';

describe("Test hero-settings's selectors", () => {
  it('isDrawerCollapsed selector returns correct value', () => {
    expect(isDrawerCollapsed(rootState)).toEqual(
      rootState.heroSettings.isDrawerCollapsed
    );
  });
});
