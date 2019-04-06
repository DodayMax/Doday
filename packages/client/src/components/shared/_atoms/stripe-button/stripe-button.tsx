import * as React from 'react';
import { noop } from 'lodash';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { Button } from '@root/components';
import { HandleTokenAction } from '@root/ducks/payments/actions';
import { ButtonSize } from '../button';

interface StripeButtonProps {
  handleToken: (token: Token) => HandleTokenAction;
}

export class StripeButton extends React.Component<StripeButtonProps> {
  render() {
    return (
      <StripeCheckout
        name={'Buy doday coins:'}
        description={'1$ for 10 doday coins.'}
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button
          size={ButtonSize.small}
          text={'Buy doday coins'}
          onClick={noop}
        />
      </StripeCheckout>
    );
  }
}
