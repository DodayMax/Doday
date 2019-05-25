import * as React from 'react';
import { connect } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button, ACLGuard } from '@shared';
import { StripeButton } from '../../_atoms/stripe-button';
import { Hero } from '@root/lib/models/entities/hero';
import { RootState } from '@root/lib/models';
import { actions as coinActions } from '@root/ducks/payments';
import { Token } from 'react-stripe-checkout';
import { HandleTokenAction } from '@root/ducks/payments/actions';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { LayoutBlock } from '../../_atoms/layout-block';
import { Space } from '@root/lib/common-interfaces';

const vars = require('@styles/_config.scss');
const css = require('./_top-bar.module.scss');

interface TopBarProps {}

interface PropsFromConnect {
  hero?: Hero | false;
  handleStripeToken: (token: Token) => HandleTokenAction;
}

@(withRouter as any)
class TopBar extends React.Component<
  TopBarProps &
    PropsFromConnect &
    WithTranslation &
    Partial<RouteComponentProps>,
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
    const { location, t } = this.props;

    return (
      <nav className={css.navBar}>
        <LayoutBlock valign="vflexCenter">
          <Link to="/" />
          <LayoutBlock insideElementsMargin paddingLeft={Space.Medium}>
            <Button
              disabled={false}
              active={location.pathname.startsWith('/store')}
              to="/store"
              borderless
            >
              {t('topbar.store')}
            </Button>
          </LayoutBlock>
        </LayoutBlock>
        {this.renderContent()}
        <ACLGuard
          allowed={
            <LayoutBlock
              insideElementsMargin
              align="flexEnd"
              valign="vflexCenter"
            >
              <StripeButton
                handleTokenActionCreator={this.props.handleStripeToken}
              />
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
  { handleStripeToken: coinActions.handleTokenActionCreator }
)(withTranslation('shell')(TopBar));
