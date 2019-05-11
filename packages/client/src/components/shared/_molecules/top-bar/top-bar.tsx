import * as React from 'react';
import { connect } from 'react-redux';
import { Button, ACLGuard } from '@shared';
import { StripeButton } from '../../_atoms/stripe-button';
import { Hero } from '@root/lib/models/entities/hero';
import { RootState } from '@root/lib/models';
import { actions as coinActions } from '@root/ducks/payments';
import { Token } from 'react-stripe-checkout';
import { HandleTokenAction } from '@root/ducks/payments/actions';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { LayoutBlock } from '../../_atoms/layout-block';

const css = require('./_top-bar.module.scss');
const logo = require('@root/assets/png/app-icon-96x96.png');

interface TopBarProps {}

interface PropsFromConnect {
  hero?: Hero | false;
  handleStripeToken: (token: Token) => HandleTokenAction;
}

@(withRouter as any)
class TopBar extends React.Component<
  TopBarProps & PropsFromConnect & Partial<RouteComponentProps>,
  any
> {
  renderContent() {
    switch (this.props.hero) {
      case undefined:
        return 'Loading';
      case false:
        return <Button href="/auth/google">Sign In</Button>;
      default:
        return null;
    }
  }

  render() {
    return (
      <nav className={css.navBar}>
        <div>
          <Link to="/">
            <img className={css.logo} src={logo} />
          </Link>
        </div>
        {this.renderContent()}
        <ACLGuard
          allowed={
            <LayoutBlock
              insideElementsMargin
              align="flex-end"
              valign="vflex-center"
            >
              <StripeButton handleToken={this.props.handleStripeToken} />
            </LayoutBlock>
          }
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
