import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@components';
import { StripeButton } from '../../_atoms/stripe-button';
import { Hero } from '@root/lib/models/entities';
import { RootState } from '@root/lib/models';
import { actions as coinActions } from '@root/ducks/payments';
import { Token } from 'react-stripe-checkout';
import { HandleTokenAction } from '@root/ducks/payments/actions';

const css = require('./_top-bar.module.scss');

interface TopBarProps {
  pathname: string;
}

interface PropsFromConnect {
  hero?: Hero | false;
  handleStripeToken: (token: Token) => HandleTokenAction;
}

class TopBar extends React.Component<TopBarProps & PropsFromConnect, any> {
  renderContent() {
    switch (this.props.hero) {
      case undefined:
        return 'Loading';
      case false:
        return <a href="/auth/google">Login with Google</a>;
      default:
        return (
          <>
            <StripeButton handleToken={this.props.handleStripeToken} />
            <a href="/api/logout">Logout</a>
          </>
        );
    }
  }

  render() {
    return (
      <nav className={css.navBar}>
        <div>Logo</div>
        {this.renderContent()}
        <Button
          primary
          text={'New Activity'}
          to={'/builder'}
          disabled={this.props.pathname === '/builder'}
        />
      </nav>
    );
  }
}

const mapState = (state: RootState) => ({
  hero: state.auth.hero,
});

export default connect(
  mapState,
  { handleStripeToken: coinActions.handleToken }
)(TopBar);
