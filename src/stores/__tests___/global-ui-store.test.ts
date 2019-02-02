import { globalUIStore } from '@stores';

describe('GlobalUIStore', () => {

  let store;

  beforeEach(() => {
    store = globalUIStore;
  })

  it('initial value of _isBuilderShown is false', () => {
    expect(globalUIStore.isBuilderShown).toBe(false);
  });

  it('toggleBuilder actually change _isBuilderShown value', () => {
    globalUIStore.toggleBuilder();
    expect(globalUIStore.isBuilderShown).toBe(true);
  });
})