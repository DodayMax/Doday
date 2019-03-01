import reducer from './reducer';
import { changePath } from './actions';

describe('doday-app duck', () => {
  it('change path action', () => {
    const path = 'dodays';
    expect(reducer(undefined, changePath(path)).path).toEqual(path);
  });
});