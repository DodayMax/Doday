import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  fetchSelectedDodayActionCreator,
  setSelectedDodayActionCreator,
  clearSelectedDodayActionCreator,
  updateSelectedDodayActionCreator,
  setSelectedGoalActionCreator,
} from './actions';
import { testDoday, testGoal } from '@root/lib/common-interfaces/fake-data';

describe('doday details page duck', () => {
  describe('action creators', () => {
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

    it('fetch selected goal action creator', () => {
      const selectedDid = 'test did';
      const expectedActionObject = {
        type: ActionConstants.FETCH_SELECTED_GOAL,
        payload: selectedDid,
      };
      expect(fetchSelectedDodayActionCreator(selectedDid)).toEqual(
        expectedActionObject
      );
    });

    it('set selected doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.SET_SELECTED_DODAY,
        payload: testDoday,
      };
      expect(setSelectedDodayActionCreator(testDoday)).toEqual(
        expectedActionObject
      );
    });

    it('set selected goal action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.SET_SELECTED_GOAL,
        payload: testGoal,
      };
      expect(setSelectedGoalActionCreator(testGoal)).toEqual(
        expectedActionObject
      );
    });

    it('set selected doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.SET_SELECTED_DODAY,
        payload: testDoday,
      };
      expect(setSelectedDodayActionCreator(testDoday)).toEqual(
        expectedActionObject
      );
    });

    it('update selected doday action creator', () => {
      const did = 'test did';
      const updates = {
        date: new Date(),
      };
      const expectedActionObject = {
        type: ActionConstants.UPDATE_SELECTED_DODAY,
        payload: {
          did,
          updates,
        },
      };
      expect(updateSelectedDodayActionCreator(did, updates)).toEqual(
        expectedActionObject
      );
    });

    it('clear selected doday action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.CLEAR_SELECTED_DODAY,
      };
      expect(clearSelectedDodayActionCreator()).toEqual(expectedActionObject);
    });
  });

  describe('doday detaila reducers', () => {
    it('set selected doday reducer', () => {
      expect(
        reducer(undefined, setSelectedDodayActionCreator(testDoday))
          .selectedDoday.did
      ).toEqual(testDoday.did);
    });

    it('set selected goal reducer', () => {
      expect(
        reducer(undefined, setSelectedGoalActionCreator(testGoal)).selectedDoday
          .did
      ).toEqual(testDoday.did);
    });

    it('update selected doday reducer', () => {
      const updates = {
        name: 'new name',
      };
      expect(
        reducer(
          undefined,
          updateSelectedDodayActionCreator(testDoday.did, updates)
        ).selectedDoday.name
      ).toEqual(updates.name);
    });

    it('clear selected doday reducer', () => {
      const state = {
        ...initialState,
        selectedDoday: testDoday,
      };
      expect(
        reducer(state, clearSelectedDodayActionCreator()).selectedDoday
      ).toEqual(undefined);
    });
  });
});
