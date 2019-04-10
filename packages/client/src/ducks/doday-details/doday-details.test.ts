import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  fetchSelectedDodayActionCreator,
  setSelectedDodayActionCreator,
  clearSelectedDodayActionCreator,
  updateSelectedDodayActionCreator,
} from './actions';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { Doday } from '@root/lib/models/entities/Doday';

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
      expect(setSelectedDodayActionCreator(doday)).toEqual(
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
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      expect(
        reducer(undefined, setSelectedDodayActionCreator(doday)).selectedDoday
          .did
      ).toEqual(doday.did);
    });

    it('update selected doday reducer', () => {
      const doday: Doday = {
        did: '123',
        activityType: 'do',
        type: DodayTypes.Doday,
        name: 'name',
        public: false,
      };
      const updates = {
        name: 'new name',
      };
      expect(
        reducer(undefined, updateSelectedDodayActionCreator(doday.did, updates))
          .selectedDoday.name
      ).toEqual(updates.name);
    });

    it('clear selected doday reducer', () => {
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
