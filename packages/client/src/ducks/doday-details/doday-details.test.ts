import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  fetchSelectedDodayActionCreator,
  setSelectedDodayActionCreator,
  clearSelectedDodayActionCreator,
  updateSelectedDodayActionCreator,
  setSelectedGoalActionCreator,
  setDirtyStatusActionCreator,
  setUpdatesForSelectedDodayActionCreator,
  clearDirtyStuffActionCreator,
} from './actions';
import { testDoday, testGoal } from '@root/lib/common-interfaces/fake-data';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';

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

    it('set dirty status action creator', () => {
      const status = true;
      const expectedActionObject = {
        type: ActionConstants.SET_DIRTY_STATUS,
        payload: status,
      };
      expect(setDirtyStatusActionCreator(status)).toEqual(expectedActionObject);
    });

    it('set updates for selected doday action creator', () => {
      const updates: Partial<SerializedDoday> = {
        date: Date.now(),
        dateIsLocked: false,
      };
      const expectedActionObject = {
        type: ActionConstants.SET_UPDATES_FOR_SELECTED_DODAY,
        payload: updates,
      };
      expect(setUpdatesForSelectedDodayActionCreator(updates)).toEqual(
        expectedActionObject
      );
    });

    it('clear updates and dirty status action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.CLEAR_DIRTY_STUFF,
      };
      expect(clearDirtyStuffActionCreator()).toEqual(expectedActionObject);
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

    it('set dirty status reducer', () => {
      const status = true;
      expect(
        reducer(initialState, setDirtyStatusActionCreator(status)).dirty
      ).toEqual(status);
    });

    it('set updates for selected doday reducer', () => {
      const updates = {
        date: Date.now(),
        dateIsLocked: true,
      };
      expect(
        reducer(initialState, setUpdatesForSelectedDodayActionCreator(updates))
          .updates.dateIsLocked
      ).toEqual(updates.dateIsLocked);
    });
  });
});
