import { isDrawerCollapsed } from '../selectors';
import { rootState } from '@root/lib/common-interfaces/fake-data';

describe("Test hero-settings's selectors", () => {
  it('isDrawerCollapsed selector returns correct value', () => {
    expect(isDrawerCollapsed(rootState)).toEqual(
      rootState.heroSettings.isDrawerCollapsed
    );
  });
});
