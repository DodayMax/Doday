import reducer, { initialStoreState } from '../reducer';
import { actionCreators } from '../actions';
import { activity } from '@root/lib/common-interfaces/fake-data';
import { DodayLike } from '@root/lib/models/entities/common';

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

  it('set Store loading state reducer', () => {
    const value = true;
    expect(
      reducer(
        initialStoreState,
        actionCreators.setStoreLoadingStateActionCreator(value)
      )
    ).toEqual({
      ...initialStoreState,
      loading: true,
    });
  });

  it('set dodays with totalCount reducer', () => {
    const dodays: DodayLike[] = [activity];
    const totalCount = 20;
    expect(
      reducer(
        initialStoreState,
        actionCreators.setPublicDodaysForStoreActionCreator(
          dodays,
          undefined,
          totalCount
        )
      )
    ).toEqual({
      ...initialStoreState,
      dodays,
      totalCount,
    });
  });
});
