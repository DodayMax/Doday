import * as React from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { HandleTokenAction } from '@root/ducks/payments/actions';
import { Coins } from '../coins';
import { Button } from '@material-ui/core';

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
        <Button size="small">
          <Coins coins={100} />
        </Button>
      </StripeCheckout>
    );
  }
}
