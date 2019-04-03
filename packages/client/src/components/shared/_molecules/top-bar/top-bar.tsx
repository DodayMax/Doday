import * as React from 'react';
import { Button } from '@components';

const css = require('./_top-bar.module.scss');

class TopBar extends React.Component<any, any> {
  renderContent() {
    switch (this.props.hero) {
      case undefined:
        return 'Loading';
      case false:
        return <a href='/auth/google'>Login with Google</a>;
      default:
        return <a href='/api/logout'>Logout</a>;
    }
  }

  render() {
    console.log(!!this.props.hero);
    return (
      <nav className={css.navBar}>
        <div>Logo</div>
        {this.renderContent()}
        <Button
          primary
          text={'New Activity'}
          to={'/builder'}
          disabled={this.props.disabled}
        />
      </nav>
    );
  }
}

export default TopBar;