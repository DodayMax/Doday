import { ActionConstants, actionCreators, HandleTokenAction } from '../actions';
import { Token } from 'react-stripe-checkout';
import { stripeToken } from '@root/lib/common-interfaces/fake-data';

describe('payments action creators', () => {
  it('handle token action creator', () => {
    const token: Token = stripeToken;
    const expectedActionObject: HandleTokenAction = {
      type: ActionConstants.HANDLE_TOKEN,
      payload: token,
    };
    expect(actionCreators.handleTokenActionCreator(token)).toEqual(
      expectedActionObject
    );
  });
});
