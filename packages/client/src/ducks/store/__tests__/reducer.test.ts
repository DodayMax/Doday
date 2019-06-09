import reducer, { initialStoreState } from '../reducer';
import { actionCreators } from '../actions';
import { activity, doday } from '@root/lib/common-interfaces/fake-data';
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

  it('set search term reducer', () => {
    const term = 'Search term';
    expect(
      reducer(
        initialStoreState,
        actionCreators.setSearchTermActionCreator(term)
      )
    ).toEqual({
      ...initialStoreState,
      searchTerm: term,
    });
  });

  it('set search flag reducer', () => {
    const flag = true;
    expect(
      reducer(
        initialStoreState,
        actionCreators.setSearchFlagActionCreator(flag)
      )
    ).toEqual({
      ...initialStoreState,
      searching: flag,
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

  it('optimistic remove public doday reducer', () => {
    const dodays: DodayLike[] = [doday];
    const totalCount = 20;
    const newState = reducer(
      { ...initialStoreState, dodays, totalCount },
      actionCreators.optimisticRemovePublicDodayActionCreator(doday.did)
    );
    expect(newState.dodays.length).toBe(0);
    expect(newState.totalCount).toBe(19);
  });
});
