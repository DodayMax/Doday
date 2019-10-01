import { myDIDSelector, activeToolsSelector } from '../selectors';
import { rootState, hero } from '@doday/lib';

describe("Test auth's selectors", () => {
  it('myDID selector returns my did', () => {
    expect(myDIDSelector(rootState)).toEqual(hero.did);
  });

  it('activeTools selector returns activeTools from auth peace of state', () => {
    expect(activeToolsSelector(rootState)).toEqual(rootState.auth.activeTools);
  });
});
