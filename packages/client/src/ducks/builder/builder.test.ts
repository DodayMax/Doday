import reducer, { initialState } from './reducer';
import {
  ActionConstants,
  fetchActivityTypes,
  setActivityTypes,
  createAndTakeDoday,
  setBuilderLoadingState,
  setBuilderSuccessFlag,
} from './actions';
import { ActivityType } from '@root/lib/common-interfaces';
import { SerializedDoday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';

describe('builder duck', () => {
  describe('builder action creators', () => {
    it('fetch activity types action creator', () => {
      const expectedActionObject = {
        type: ActionConstants.FETCH_ACTIVITY_TYPES,
      };
      expect(fetchActivityTypes()).toEqual(expectedActionObject);
    });

    it('set activity types action creator', () => {
      const types: ActivityType[] = [
        {
          id: '123',
          sysname: 'read',
        },
      ];
      const expectedActionObject = {
        type: ActionConstants.SET_ACTIVITY_TYPES,
        payload: types,
      };
      expect(setActivityTypes(types)).toEqual(expectedActionObject);
    });

    it('create doday and progress action creator', () => {
      const doday: SerializedDoday = {
        did: 'test',
        type: DodayTypes.Doday,
        name: 'test',
        public: false,
      };
      const expectedActionObject = {
        type: ActionConstants.CREATE_AND_TAKE_DODAY,
        payload: doday,
      };
      expect(createAndTakeDoday(doday)).toEqual(expectedActionObject);
    });

    it('set builder loading state action creator', () => {
      const state = false;
      const expectedActionObject = {
        type: ActionConstants.SET_BUILDER_LOADING_STATE,
        payload: state,
      };
      expect(setBuilderLoadingState(state)).toEqual(expectedActionObject);
    });

    it('set builder success flag action creator', () => {
      const state = false;
      const expectedActionObject = {
        type: ActionConstants.SET_BUILDER_SUCCESS_FLAG,
        payload: state,
      };
      expect(setBuilderSuccessFlag(state)).toEqual(expectedActionObject);
    });
  });

  describe('builder reducer', () => {
    it('set activity types reducer', () => {
      const types: ActivityType[] = [
        {
          id: '123',
          sysname: 'read',
        },
      ];
      expect(
        reducer(initialState, setActivityTypes(types)).activityTypes
      ).toEqual(types);
    });

    it('set builder loading state reducer', () => {
      const state = true;
      expect(reducer(initialState, setBuilderLoadingState(state)).loading).toBe(
        true
      );
    });

    it('set builder success flag reducer', () => {
      const state = true;
      expect(reducer(initialState, setBuilderSuccessFlag(state)).success).toBe(
        true
      );
    });
  });
});
