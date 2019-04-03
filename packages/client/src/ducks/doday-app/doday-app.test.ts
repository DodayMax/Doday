import reducer from './reducer';
import { changePath, ActionConstants, pushToNavStack, popFromNavStack, fetchDodaysForDate, setDodaysForDate, setDodaysBadgeForToday, setLoadingState, fetchAllGoals, setGoals } from './actions';
import { Doday } from '@root/lib/common-interfaces';

describe('doday-app duck', () => {
  
  describe('doday-app action creators', () => {
    it('set loading state action creator', () => {
      const value = true;
      const expectedActionObject = {
        type: ActionConstants.SET_LOADING_STATE,
        payload: value,
      };
      expect(setLoadingState(value)).toEqual(expectedActionObject);
    });

    it('change path action creator', () => {
      const path = 'dodays';
      const expectedActionObject = {
        type: ActionConstants.CHANGE_PATH,
        payload: path,
      };
      expect(changePath(path)).toEqual(expectedActionObject);
    });

    it('push to nav stack action creator', () => {
      const newDoday: Doday = {
        id: '123',
        type: 'goal',
        name: 'name'
      };
      const expectedActionObject = {
        type: ActionConstants.PUSH_TO_NAV_STACK,
        payload: newDoday,
      };
      expect(pushToNavStack(newDoday)).toEqual(expectedActionObject);
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
      const dodays: Doday[] = [{
        id: '123',
        type: 'action',
        name: 'name'
      }];
      const expectedActionObject = {
        type: ActionConstants.SET_DODAYS_FOR_DATE,
        payload: dodays,
      };
      expect(setDodaysForDate(dodays)).toEqual(expectedActionObject);
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
      expect(fetchAllGoals()).toEqual(expectedActionObject);
    });

    it('set goals action creator', () => {
      const goals: Doday[] = [{
        id: '123',
        type: 'goal',

        name: 'name'
      }];
      const expectedActionObject = {
        type: ActionConstants.FETCH_ALL_GOALS,
      };
      expect(fetchAllGoals()).toEqual(expectedActionObject);
    });
  });

  describe('doday-app reducers', () => {
    it('set loading state reducer', () => {
      const value = true;
      expect(reducer(undefined, setLoadingState(value)).loading).toBe(value);
    });

    it('change path reducer', () => {
      const path = 'dodays';
      expect(reducer(undefined, changePath(path)).path).toEqual(path);
    });

    it('push new doday to navigation stack reducer', () => {
      const newDoday: Doday = {
        id: '123',
        type: 'goal',
        name: 'name'
      };
      expect(reducer(undefined, pushToNavStack(newDoday)).navStack[0].name).toEqual(newDoday.name);
    });

    it('pop from navigation stack reducer', () => {
      const newDoday: Doday = {
        id: '123',
        type: 'goal',
        name: 'name'
      };
      expect(reducer(undefined, pushToNavStack(newDoday)).navStack[0].name).toEqual(newDoday.name);
      expect(reducer(undefined, popFromNavStack()).navStack.length).toBe(0);
    });

    it('set dodays for date reducer', () => {
      const dodays: Doday[] = [{
        id: '123',
        type: 'action',
        name: 'name'
      }];
      expect(reducer(undefined, setDodaysForDate(dodays)).dodays).toEqual(dodays);
    });

    it('set goals reducer', () => {
      const goals: Doday[] = [{
        id: '123',
        type: 'goal',
        name: 'name'
      }];
      expect(reducer(undefined, setGoals(goals)).dodays).toEqual(goals);
    });

    it('set dodays badge for today reducer', () => {
      const value = 5;
      expect(reducer(undefined, setDodaysBadgeForToday(5)).badge).toEqual(value);
    });
  });

});