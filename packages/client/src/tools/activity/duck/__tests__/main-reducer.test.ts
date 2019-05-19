import { mainReducer, initialActivityToolState } from '../reducer';
import { actionCreators, optimisticUpdatesActionCreators } from '../actions';
import { Activity } from '../../entities/activity';
import {
  activity,
  doday,
  progress,
} from '@root/lib/common-interfaces/fake-data';

describe("test activity's main reducer", () => {
  it('set fetched activities reducer', () => {
    const activities: Activity[] = [activity];
    expect(
      mainReducer(
        initialActivityToolState,
        actionCreators.setActivitiesActionCreator(activities)
      )
    ).toEqual({
      ...initialActivityToolState,
      dodays: activities,
    });
  });

  it('create doday optimistic update', () => {
    const updates = {
      doday,
      progress,
    };
    const newState = mainReducer(
      initialActivityToolState,
      optimisticUpdatesActionCreators.createDodayOptimisticUpdateActionCreator(
        updates
      )
    );
    expect(newState.dodays.length).toBe(1);
  });

  it('update doday optimistic update', () => {
    const activities: Activity[] = [activity];
    const payload = {
      did: activity.did,
      updates: {
        progress: {
          completed: true,
        },
      },
    };
    const newState = mainReducer(
      {
        ...initialActivityToolState,
        dodays: activities,
      },
      optimisticUpdatesActionCreators.updateDodayOptimisticUpdateActionCreator(
        payload
      )
    );
    expect(newState.dodays[0].progress.completed).toBe(true);
  });

  it('take doday optimistic update', () => {
    const activitiesWithoutProgess: Activity[] = [doday];
    const payload = {
      did: doday.did,
      progress,
    };
    const newState = mainReducer(
      {
        ...initialActivityToolState,
        dodays: activitiesWithoutProgess,
      },
      optimisticUpdatesActionCreators.takeDodayOptimisticUpdateActionCreator(
        payload
      )
    );
    expect(newState.dodays[0].progress).toEqual(progress);
  });

  it('untake doday optimistic update', () => {
    const activitiesWithoutProgess: Activity[] = [activity];
    const did = activity.did;
    const newState = mainReducer(
      {
        ...initialActivityToolState,
        dodays: activitiesWithoutProgess,
      },
      optimisticUpdatesActionCreators.untakeDodayOptimisticUpdateActionCreator(
        did
      )
    );
    expect(newState.dodays[0].progress).toEqual(undefined);
  });

  it('delete doday optimistic update', () => {
    const activitiesWithoutProgess: Activity[] = [activity];
    const did = activity.did;
    const newState = mainReducer(
      {
        ...initialActivityToolState,
        dodays: activitiesWithoutProgess,
      },
      optimisticUpdatesActionCreators.deleteDodayOptimisticUpdateActionCreator(
        did
      )
    );
    expect(newState.dodays.length).toBe(0);
  });
});
