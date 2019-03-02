import reducer from './reducer';
import { changePath, ActionConstants } from './actions';

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
  });

  describe('doday-app reducers', () => {
    it('change path reducer', () => {
      const path = 'dodays';
      expect(reducer(undefined, changePath(path)).path).toEqual(path);
    });
  });

});