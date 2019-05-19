import * as React from 'react';
import { noop } from 'lodash';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Button } from '@shared';
import { HandleTokenAction } from '@root/ducks/payments/actions';
import { ButtonSize } from '../button';
import { Coins } from '../coins';

interface StripeButtonProps {
  handleTokenActionCreator: (token: Token) => HandleTokenAction;
}

export class StripeButton extends React.Component<StripeButtonProps> {
  render() {
    return (
      <StripeCheckout
        name={'Buy doday coins:'}
        description={'1$ for 10 doday coins.'}
        amount={500}
        token={token => this.props.handleTokenActionCreator(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button borderless size={ButtonSize.small}>
          <Coins coins={100} />
        </Button>
      </StripeCheckout>
    );
  }
}
