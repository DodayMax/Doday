import reducer from './reducer';
import { changePath, ActionConstants, pushToNavStack, popFromNavStack, fetchDodaysForDate, setDodaysForDate } from './actions';
import { Doday } from '@root/lib/common-interfaces';

describe('doday-app duck', () => {
  
  describe('doday-app action creators', () => {
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
        type: 'folder',
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
  });

  describe('doday-app reducers', () => {
    it('change path reducer', () => {
      const path = 'dodays';
      expect(reducer(undefined, changePath(path)).path).toEqual(path);
    });

    it('push new doday to navigation stack reducer', () => {
      const newDoday: Doday = {
        id: '123',
        type: 'folder',
        name: 'name'
      };
      expect(reducer(undefined, pushToNavStack(newDoday)).navStack[0].name).toEqual(newDoday.name);
    });

    it('pop from navigation stack reducer', () => {
      const newDoday: Doday = {
        id: '123',
        type: 'folder',
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
      expect(reducer(undefined, setDodaysForDate(dodays)).todayDodays).toEqual(dodays);
    });
  });

});