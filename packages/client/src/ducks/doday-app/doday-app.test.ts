import reducer, { initialState } from './reducer';
import {
  changePath,
  ActionConstants,
  pushToNavStack,
  popFromNavStack,
  fetchDodaysForDate,
  setDodaysForDate,
  setDodaysBadgeForToday,
  setAppLoadingState,
  fetchAllGoals,
  setGoals,
  toggleDoday,
  SetSelectedDodayActionCreator,
  fetchSelectedDodayActionCreator,
  clearSelectedDodayActionCreator,
  removeDodayActionCreator,
} from './actions';
import { Doday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { Goal } from '@root/lib/models/entities/Goal';

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
      const path = 'dodays';
      const expectedActionObject = {
        type: ActionConstants.CHANGE_PATH,
        payload: path,
      };
      expect(changePath(path)).toEqual(expectedActionObject);
    });

    it('push to nav stack action creator', () => {
      const newDoday: Goal = {
        did: '123',
        type: DodayTypes.Goal,
        name: 'name',
        children: [],
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
      const dodays: Doday[] = [
        {
          did: '123',
          activityType: 'do',
          type: DodayTypes.Doday,
          name: 'name',
          public: false,
        },
      ];
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
      const goals: Goal[] = [
        {
          did: '123',
          type: DodayTypes.Goal,
          name: 'name',
          children: [],
        },
      ];
      const expectedActionObject = {
        type: ActionConstants.FETCH_ALL_GOALS,
      };
      expect(fetchAllGoals()).toEqual(expectedActionObject);
    });

    it('toggle doday action creator', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      const expectedActionObject = {
        type: ActionConstants.TOGGLE_DODAY,
        payload: doday,
      };
      expect(toggleDoday(doday)).toEqual(expectedActionObject);
    });

    it('delete doday action creator', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      const expectedActionObject = {
        type: ActionConstants.DELETE_DODAY,
        payload: doday,
      };
      expect(toggleDoday(doday)).toEqual(expectedActionObject);
    });

    it('fetch selected doday action creator', () => {
      const selectedDid = 'test did';
      const expectedActionObject = {
        type: ActionConstants.FETCH_SELECTED_DODAY,
        payload: selectedDid,
      };
      expect(fetchSelectedDodayActionCreator(selectedDid)).toEqual(
        expectedActionObject
      );
    });

    it('set selected doday action creator', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      const expectedActionObject = {
        type: ActionConstants.SET_SELECTED_DODAY,
        payload: doday,
      };
      expect(SetSelectedDodayActionCreator(doday)).toEqual(
        expectedActionObject
      );
    });

    it('clear selected doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.CLEAR_SELECTED_DODAY,
      };
      expect(clearSelectedDodayActionCreator()).toEqual(expectedActionObject);
    });

    it('remove doday from my app action creator', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      const expectedActionObject = {
        type: ActionConstants.REMOVE_DODAY,
        payload: doday,
      };
      expect(removeDodayActionCreator(doday)).toEqual(expectedActionObject);
    });
  });

  describe('doday-app reducers', () => {
    it('set loading state reducer', () => {
      const value = true;
      expect(reducer(undefined, setAppLoadingState(value)).loading).toBe(value);
    });

    it('change path reducer', () => {
      const path = 'dodays';
      expect(reducer(undefined, changePath(path)).path).toEqual(path);
    });

    it('push new doday to navigation stack reducer', () => {
      const newDoday: Goal = {
        did: '123',
        type: DodayTypes.Goal,
        name: 'name',
        children: [],
      };
      expect(
        reducer(undefined, pushToNavStack(newDoday)).navStack[0].name
      ).toEqual(newDoday.name);
    });

    it('pop from navigation stack reducer', () => {
      const newDoday: Goal = {
        did: '123',
        type: DodayTypes.Goal,
        name: 'name',
        children: [],
      };
      expect(
        reducer(undefined, pushToNavStack(newDoday)).navStack[0].name
      ).toEqual(newDoday.name);
      expect(reducer(undefined, popFromNavStack()).navStack.length).toBe(0);
    });

    it('set dodays for date reducer', () => {
      const dodays: Doday[] = [
        {
          did: '123',
          activityType: 'do',
          type: DodayTypes.Doday,
          name: 'name',
          public: false,
        },
      ];
      expect(reducer(undefined, setDodaysForDate(dodays)).dodays).toEqual(
        dodays
      );
    });

    it('set goals reducer', () => {
      const goals: Goal[] = [
        {
          did: '123',
          type: DodayTypes.Goal,
          name: 'name',
          children: [],
        },
      ];
      expect(reducer(undefined, setGoals(goals)).dodays).toEqual(goals);
    });

    it('set dodays badge for today reducer', () => {
      const value = 5;
      expect(reducer(undefined, setDodaysBadgeForToday(5)).badge).toEqual(
        value
      );
    });

    it('set select doday reducer', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      expect(
        reducer(undefined, SetSelectedDodayActionCreator(doday)).selectedDoday
          .did
      ).toEqual(doday.did);
    });

    it('clear select doday reducer', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      const state = {
        ...initialState,
        selectedDoday: doday,
      };
      expect(
        reducer(state, clearSelectedDodayActionCreator()).selectedDoday
      ).toEqual(undefined);
    });
  });
});
