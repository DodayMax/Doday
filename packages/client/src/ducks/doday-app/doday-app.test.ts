import reducer from './reducer';
import {
  changePath,
  ActionConstants,
  pushToNavStack,
  popFromNavStack,
  fetchDodaysForDate,
  setDodaysForDate,
  setDodaysBadgeForToday,
  setAppLoadingState,
  toggleDoday,
  removeDodayActionCreator,
  updateDodayActionCreator,
  setToNavStackActionCreator,
  setGoalsActionCreator,
  fetchAllGoalsActionCreator,
  deleteGoalActionCreator,
  pushToNavStackByDIDActionCreator,
  planOutActionCreator,
  fetchPublicDodaysActionCreator,
  setPublicDodaysActionCreator,
} from './actions';
import { deleteDoday } from '@root/services/api/dodays/mutations';
import { doday, goal } from '@root/lib/common-interfaces/fake-data';

describe('doday-app duck', () => {
  describe('doday-app action creators', () => {
    it('set loading state action creator', () => {
      const value = true;
      const expectedActionObject = {
        type: ActionConstants.SET_LOADING_STATE,
        payload: value,
      };
      expect(setAppLoadingState(value)).toEqual(expectedActionObject);
    });

    it('change path action creator', () => {
      const path = '/';
      const expectedActionObject = {
        type: ActionConstants.CHANGE_PATH,
        payload: path,
      };
      expect(changePath(path)).toEqual(expectedActionObject);
    });

    it('set Goal[] to nav stack action creator', () => {
      const goals: Goal[] = [goal];
      const expectedActionObject = {
        type: ActionConstants.SET_NAV_STACK,
        payload: goals,
      };
      expect(setToNavStackActionCreator(goals)).toEqual(expectedActionObject);
    });

    it('push to nav stack action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.PUSH_TO_NAV_STACK,
        payload: goal,
      };
      expect(pushToNavStack(goal)).toEqual(expectedActionObject);
    });

    it('push to nav stack by DID action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.PUSH_TO_NAV_STACK_BY_DID,
        payload: goal.did,
      };
      expect(pushToNavStackByDIDActionCreator(goal.did)).toEqual(
        expectedActionObject
      );
    });

    it('pop from nav stack action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.POP_FROM_NAV_STACK,
      };
      expect(popFromNavStack()).toEqual(expectedActionObject);
    });

    it('fetch dodays for date action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_DODAYS_FOR_DATE,
      };
      expect(fetchDodaysForDate()).toEqual(expectedActionObject);
    });

    it('set dodays for date action creator', () => {
      const dodays: Doday[] = [doday];
      const expectedActionObject = {
        type: ActionConstants.SET_DODAYS_FOR_DATE,
        payload: dodays,
      };
      expect(setDodaysForDate(dodays)).toEqual(expectedActionObject);
    });

    it("fetch Hero' public dodays action creator", () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_PUBLIC_DODAYS,
      };
      expect(fetchPublicDodaysActionCreator()).toEqual(expectedActionObject);
    });

    it("set Hero's public dodays to store action creator", () => {
      const dodays: Doday[] = [doday];
      const expectedActionObject = {
        type: ActionConstants.SET_PUBLIC_DODAYS,
        payload: dodays,
      };
      expect(setPublicDodaysActionCreator(dodays)).toEqual(
        expectedActionObject
      );
    });

    it('set dodays badge for today action creator', () => {
      const value = 5;
      const expectedActionObject = {
        type: ActionConstants.SET_DODAYS_FOR_DATE,
        payload: value,
      };
      expect(setDodaysBadgeForToday(value)).toEqual(expectedActionObject);
    });

    it('fetch all goals action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_ALL_GOALS,
      };
      expect(fetchAllGoalsActionCreator()).toEqual(expectedActionObject);
    });

    it('set goals action creator', () => {
      const goals: Goal[] = [goal];
      const expectedActionObject = {
        type: ActionConstants.SET_GOALS,
      };
      expect(setGoalsActionCreator(goals)).toEqual(expectedActionObject);
    });

    it('toggle doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.TOGGLE_DODAY,
        payload: doday,
      };
      expect(toggleDoday(doday)).toEqual(expectedActionObject);
    });

    it('delete doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.DELETE_DODAY,
        payload: doday.did,
      };
      expect(deleteDoday(doday.did)).toEqual(expectedActionObject);
    });

    it('delete goal action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.DELETE_GOAL,
        payload: goal.did,
      };
      expect(deleteGoalActionCreator(goal.did)).toEqual(expectedActionObject);
    });

    it('remove doday from my app action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.REMOVE_DODAY,
        payload: doday,
      };
      expect(removeDodayActionCreator(doday)).toEqual(expectedActionObject);
    });

    it('remove doday from my app action creator', () => {
      const did = 'test did';
      const updates = {
        date: Date.now(),
        name: 'new name',
      };
      const expectedActionObject = {
        type: ActionConstants.UPDATE_DODAY,
        payload: {
          did,
          updates,
        },
      };
      expect(updateDodayActionCreator(did, updates)).toEqual(
        expectedActionObject
      );
    });

    it('plan out action creator', () => {
      const date = Date.now();
      const expectedActionObject = {
        type: ActionConstants.PLAN_OUT,
        payload: date,
      };
      expect(planOutActionCreator(date)).toEqual(expectedActionObject);
    });
  });

  describe('doday-app reducers', () => {
    it('set loading state reducer', () => {
      const value = true;
      expect(reducer(undefined, setAppLoadingState(value)).loading).toBe(value);
    });

    it('change path reducer', () => {
      const path = '/';
      expect(reducer(undefined, changePath(path)).path).toEqual(path);
    });

    it('push new doday to navigation stack reducer', () => {
      expect(reducer(undefined, pushToNavStack(goal)).navStack[0].name).toEqual(
        goal.name
      );
    });

    it('pop from navigation stack reducer', () => {
      expect(reducer(undefined, pushToNavStack(goal)).navStack[0].name).toEqual(
        goal.name
      );
      expect(reducer(undefined, popFromNavStack()).navStack.length).toBe(0);
    });

    it('set goals to navigation stack reducer', () => {
      expect(
        reducer(undefined, setToNavStackActionCreator([goal])).navStack[0].name
      ).toEqual(goal.name);
    });

    it('set dodays for date reducer', () => {
      const dodays: Doday[] = [doday];
      expect(reducer(undefined, setDodaysForDate(dodays)).dodays).toEqual(
        dodays
      );
    });

    it('set public dodays reducer', () => {
      const dodays: Doday[] = [doday];
      expect(
        reducer(undefined, setPublicDodaysActionCreator(dodays)).dodays
      ).toEqual(dodays);
    });

    it('set goals reducer', () => {
      const goals: Goal[] = [goal];
      expect(reducer(undefined, setGoalsActionCreator(goals)).dodays).toEqual(
        goals
      );
    });

    it('set dodays badge for today reducer', () => {
      const value = 5;
      expect(reducer(undefined, setDodaysBadgeForToday(5)).badge).toEqual(
        value
      );
    });
  });
});
