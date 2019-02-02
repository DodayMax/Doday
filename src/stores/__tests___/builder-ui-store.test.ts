import { builderUIStore } from '@stores';

describe('builderUIStore', () => {

  let store;

  beforeEach(() => {
    store = builderUIStore;
  })

  it('initial value of _isBuilderShown is false', () => {
    expect(store.selectedDodayType).toBe(undefined);
  });
})