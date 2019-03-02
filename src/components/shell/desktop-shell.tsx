import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { Drawer, DodayApp, Button } from '@components';
import { fakeDodays } from '@lib/fake-data/dodays';
import { RootState } from '@lib/models';
import { actions } from '@ducks/hero-settings';

const styles = require('./_desktop-shell.module.scss');

class DesktopShell extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  toggleMenu() {
    this.props.toggleDrawer();
  }

  render() {
    return (
      <Router>
        <div className={styles.desktopContainer}>
          <nav className={styles.navBar}>
            <div>Logo</div>
            <Button text={'New Doday'} primary to={'/builder'} />
          </nav>
          <section className={styles.contentContainer}>
            <nav>
              <Drawer collapsed={this.props.isDrawerShown} toggle={() => this.toggleMenu()} />
            </nav>
            <DodayApp dodays={fakeDodays} />
            <section className={styles.mainLayout}>
              <Route exact path="/" render={() => <div>Store</div>} />
              <Route path="/dodays/:id" render={() => <div>Doday details</div>} />
              <Route path="/builder" render={() => <div>Builder</div>} />
            </section>
          </section>
        </div>
      </Router>
    );
  }
}

const mapState = (state: RootState) => ({
  isDrawerShown: state.heroSettings.isDrawerShown,
});

export default connect(mapState, { toggleDrawer: actions.toggleDrawer })(DesktopShell);