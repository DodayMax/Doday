import reducer, { initialState } from './reducer';
import { ActionConstants, fetchActivityTypes, setActivityTypes, SetActivityTypesAction } from './actions';
import { ActivityType } from '@root/lib/common-interfaces';
import { BuilderState } from '@root/lib/models';

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
        }
      ];
      const expectedActionObject = {
        type: ActionConstants.SET_ACTIVITY_TYPES,
        payload: types,
      };
      expect(setActivityTypes(types)).toEqual(expectedActionObject);
    });
  });

  describe('builder reducer', () => {
    it('set activity types reducer', () => {
      const types: ActivityType[] = [
        {
          id: '123',
          sysname: 'read',
        }
      ];
      expect(reducer(initialState, setActivityTypes(types)).activityTypes).toEqual(types);
    });
  });
});