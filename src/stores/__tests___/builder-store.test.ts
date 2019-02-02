import { builderStore } from '@stores';

describe('BuilderStore', () => {

  let store;

  beforeEach(() => {
    store = builderStore;
  })

  it('initial value of _isBuilderShown is false', () => {
    expect(store.selectedDodayType).toBe(undefined);
  });
})