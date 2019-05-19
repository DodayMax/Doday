import reducer, { initialStoreState } from '../reducer';
import { actionCreators } from '../actions';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { DodayLike } from '@root/tools/types';

describe("test store's reducers", () => {
  it('set dodays reducer', () => {
    const dodays: DodayLike[] = [activity];
    expect(
      reducer(
        initialStoreState,
        actionCreators.setPublicDodaysForStoreActionCreator(dodays)
      )
    ).toEqual({
      ...initialStoreState,
      dodays,
    });
  });
});
